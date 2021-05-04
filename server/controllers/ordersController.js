const { check, validationResult } = require('express-validator')
const { Order, User, Master, Clock, City } = require('../models')
const { CRUDController } = require('./common/CRUDController')
const { noTimestamps, timeStrToWords } = require('../shared/services')
const { notInPast } = require('./validators/customValidators')

const sendEmail = require('../shared/mailjet')

const { utcToZonedTime, format } = require('date-fns-tz')
const timeZone = 'Europe/Kiev'

const ONE_HOUR_MSEC = new Date('1970-01-01T01:00:00Z')

class OrdersController extends CRUDController {
  constructor(model) {
    super(model)
  }
  // put(req, res) goes to parent CRUDController

  // overrides parent CRUDcontroller method to add names of associated entities
  async getAll(req, res) {
    const { page, pageSize, email: emailQuery } = req.query

    if (page && !pageSize) {
      res.status(400).json({
        errors: [
          {
            param: 'orders',
            msg: 'pageSize must be specified!',
          },
        ],
      })
    }

    if (pageSize && !page) {
      return res.status(400).json({
        errors: [
          {
            param: 'orders',
            msg: 'page must be specified!',
          },
        ],
      })
    }

    let whereOptions = { where: [] }
    if (emailQuery) {
      whereOptions.where.push({ '$user.email$': emailQuery })
    }

    const {
      count: totalCount,
      page: currentPage,
      rows,
    } = await Order.findAllPaginated(
      {
        ...whereOptions,
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: Master,
            as: 'master',
            include: [
              {
                model: City,
                as: 'city',
              },
            ],
          },
          {
            model: Clock,
            as: 'clock',
          },
        ],
        order: [
          // that is sortring order, not our order entity
          ['id', 'ASC'],
        ],
      },
      {
        page,
        pageSize,
      }
    )

    const data = rows.map((o) => {
      const {
        user: wipedUser,
        master: wipedMaster,
        clock: wipedClock,
        ...order
      } = noTimestamps(o.dataValues) // without user, master, clock information
      order.userName = o.user.name
      order.userEmail = o.user.email
      order.masterName = o.master.name
      order.clockType = o.clock.type
      order.masterCity = o.master.city.name
      return order
    })
    return res.status(200).json({ totalCount, currentPage, data })
  }

  // overrides parent CRUDcontroller method
  async post(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    const { price: wipedPrice, ...data } = req.body

    const { clockId, masterId } = data

    const masterFromRequest = await Master.findByPk(masterId)
    const clockFromRequest = await Clock.findByPk(clockId)

    data.price =
      Math.round(
        (masterFromRequest.hourRate / ONE_HOUR_MSEC) *
          new Date(`1970-01-01T${clockFromRequest.repairTime}Z`) *
          100
      ) / 100

    let user
    if (data.userId) {
      // user was logged in (administrator) - so we have userId
      user = await User.findByPk(data.userId)
    } else {
      // user wasn't logged in (customer) - need to find by email or create
      ;[user] = await User.findOrCreate({
        where: { email: data.email },
        defaults: { name: data.name },
      })
      user.name = data.name
      user.save()
      data.userId = user.id
    }

    try {
      var createResult = await Order.create(data)
    } catch (error) {
      return res.status(400).json({
        errors: [
          {
            param: 'order',
            msg: error.message,
          },
        ],
      })
    }

    //get created order from DB with all associated models
    const newOrders = await Order.findAll({
      where: { id: createResult.dataValues.id },
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: Master,
          as: 'master',
          include: [
            {
              model: City,
              as: 'city',
            },
          ],
        },
        {
          model: Clock,
          as: 'clock',
        },
      ],
      order: [
        // that is sortring order, not our order entity
        ['id', 'ASC'],
      ],
    })

    //put created order to google calendar
    newOrders[0].putToGoogleCalendar()

    // gather information for email
    const { master, clock } = newOrders[0]
    const ukrTime = utcToZonedTime(newOrders[0].onTime, timeZone)
    const ukrTimeStr = format(ukrTime, 'dd.MM.yyyy HH:mm', {
      timeZone: timeZone,
    })

    //send order by e-mail
    const emailResult = await sendEmail({
      toEmail: user.email,
      HTMLPart: `
        <h2>Order information</h2>
        <div>Order ID: ${newOrders[0].id}
        <div>User Name: ${user.name}</div>
        <div>User Email: ${user.email}</div>
        <div>City: ${master.city.name}</div>
        <div>On Time: ${ukrTimeStr}</div>
        <div>
          Clock Type: ${clock.type}, 
          repair time: ${timeStrToWords(clock.repairTime)}
          </div>
        <div>Master: ${master.name}</div>
        `,
    })

    //prepare data to send as responce
    const {
      user: wipedUser,
      master: wipedMaster,
      clock: wipedClock,
      ...orderToSend
    } = {
      ...noTimestamps(newOrders[0].dataValues),
      userName: user.name,
      userEmail: user.email,
      masterName: master.name,
      masterCity: master.city.name,
      clockType: clock.type,
      isEmailSent: emailResult.response.ok,
    }

    return res.status(201).json(orderToSend)
  }

  // overrides parent CRUDcontroller method
  async put(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    let { id, price: wipedPrice, ...data } = req.body

    const { masterId, clockId } = data
    const masterFromRequest = await Master.findByPk(masterId)
    const clockFromRequest = await Clock.findByPk(clockId)

    data.price =
      Math.round(
        (masterFromRequest.hourRate / ONE_HOUR_MSEC) *
          new Date(`1970-01-01T${clockFromRequest.repairTime}Z`) *
          100
      ) / 100

    id = req.params.id

    let orderToUpdate = await this.model.findByPk(id)
    if (!orderToUpdate)
      return res.status(400).json({
        message: `Model with id:${id} not found`,
      })

    Object.assign(orderToUpdate, data)

    try {
      var updateResult = await orderToUpdate.save()
      // updateResult.dataValues.masterName = await Master.findByPk(
      //   updateResult.dataValues.masterId
      // ).then(({ name }) => name)
      // updateResult.dataValues.userName = await User.findByPk(
      //   updateResult.dataValues.userId
      // ).then(({ name }) => name)
      // updateResult.dataValues.clockType = await Clock.findByPk(
      //   updateResult.dataValues.clockId
      // ).then(({ type }) => type)
    } catch ({ errors }) {
      return res.status(400).json({ errors })
    }

    if (!updateResult) {
      return res.stats(500).json({
        message: 'CDUD controller error: model not updated',
      })
    }

    //get updated order from DB with all associated models
    const updatedOrders = await Order.findAll({
      where: { id: updateResult.dataValues.id },
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: Master,
          as: 'master',
          include: [
            {
              model: City,
              as: 'city',
            },
          ],
        },
        {
          model: Clock,
          as: 'clock',
        },
      ],
      order: [
        // that is sortring order, not our order entity
        ['id', 'ASC'],
      ],
    })

    //put created order to google calendar
    try {
      updatedOrders[0].putToGoogleCalendar()
    } catch (error) {
      return res.stats(500).json({
        message: 'Error registering event at google calendar',
        error,
      })
    }

    //prepare data to send as responce
    const { master, clock, user } = updatedOrders[0]
    const {
      user: wipedUser,
      master: wipedMaster,
      clock: wipedClock,
      ...orderToSend
    } = {
      ...noTimestamps(updatedOrders[0].dataValues),
      userName: user.name,
      userEmail: user.email,
      masterName: master.name,
      masterCity: master.city.name,
      clockType: clock.type,
    }

    return res.status(200).json(orderToSend)

    // return res.status(200).json(noTimestamps(updatedOrder.dataValues))
  }

  putValidators() {
    return [
      check('onTime', 'onTime must exist!')
        .exists()
        .notEmpty()
        .custom(notInPast),
      check('clockId', 'clockId must exist!').exists().notEmpty(),
      check('masterId', 'masterId must exist!').exists().notEmpty(),
    ]
  }

  postValidators() {
    return [
      check('onTime', 'onTime must exist!')
        .exists()
        .notEmpty()
        .custom(notInPast),
      check('clockId', 'clockId must exist!').exists().notEmpty(),
      check('masterId', 'masterId must exist!').exists().notEmpty(),
    ]
  }
}

exports.ordersController = new OrdersController(Order)
