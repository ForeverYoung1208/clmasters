const { check, validationResult } = require('express-validator')
const { Order, User, Master, Clock, City } = require('../models')
const { CRUDController } = require('./common/CRUDController')
const { noTimestamps, timeStrToWords } = require('../shared/services')
const { notInPast } = require('./validators/customValidators')

const sendEmail = require('../shared/mailjet')

const { utcToZonedTime, format } = require('date-fns-tz')
const timeZone = 'Europe/Kiev'

class OrdersController extends CRUDController {
  constructor(model) {
    super(model)
  }
  // put(req, res) goes to parent CRUDController

  // overrides parent CRUDcontroller method to add names of associated entities
  async getAll(req, res) {
    const orders = await Order.findAll({
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
    const data = orders.map((o) => {
      const { user, master, clock, ...order } = noTimestamps(o.dataValues) // without user, master, clock information
      order.userName = o.user.name //only userName
      order.masterName = o.master.name //only masterName
      order.clockType = o.clock.type //only clockType
      return order
    })
    return res.status(200).json(data)
  }

  // overrides parent CRUDcontroller method
  async post(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    const data = req.body
    let user

    if (data.userId) {
      // user was logged in (administrator) - so we have userId
      user = await User.findByPk(data.userId)
    } else {
      // user wasn't logged in (customer) - need to find by email or create
      [user] = await User.findOrCreate({
        where: { email: data.email },
        defaults: { name: data.name },
      })
      user.name = data.name
      user.save()
      data.userId = user.id
    }

    try {
      var _newOrder = await Order.create(data)
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      })
    }

    const newOrders = await Order.findAll({
      where: { id: _newOrder.dataValues.id },
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

    const { master, clock } = newOrders[0]

    const ukrTime = utcToZonedTime(newOrders[0].onTime, timeZone)
    const ukrTimeStr = format(ukrTime, 'dd.MM.yyyy HH:mm', {
      timeZone: timeZone,
    })

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
    
    const {user:u, master:m, clock:c, ...orderToSend} = {
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

    let { id, ...data } = req.body
    id = req.params.id

    let modelToUpdate = await this.model.findByPk(id)
    if (!modelToUpdate)
      return res.status(400).json({
        message: `Model with id:${id} not found`,
      })

    Object.assign(modelToUpdate, data)

    try {
      var result = await modelToUpdate.save()
      result.dataValues.masterName = await Master.findByPk(
        result.dataValues.masterId
      ).then(({ name }) => name)
      result.dataValues.userName = await User.findByPk(
        result.dataValues.userId
      ).then(({ name }) => name)
      result.dataValues.clockType = await Clock.findByPk(
        result.dataValues.clockId
      ).then(({ type }) => type)
    } catch ({ errors }) {
      return res.status(400).json({ errors })
    }

    if (!result)
      return res.stats(500).json({
        message: 'CDUD controller error: model not updated',
      })

    return res.status(200).json(noTimestamps(result.dataValues))
  }

  async getAllByParam(req, res) {
    let masterQuery = req.query
    let emailQuery = {}
    if (req.query.email) {
      masterQuery = {}
      emailQuery = req.query
    }

    const orders = await Order.findAll({
      where: [masterQuery, { '$user.email$': emailQuery.email }],
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

    const data = orders.map((order) => noTimestamps(order.dataValues))

    return res.status(200).json(data)
  }

  putValidators() {
    return [
      check('onTime', 'onTime must exist!').exists().notEmpty().custom(notInPast),
      check('clockId', 'clockId must exist!').exists().notEmpty(),
      check('masterId', 'masterId must exist!').exists().notEmpty(),
    ]
  }

  postValidators() {
    return [
      check('onTime', 'onTime must exist!').exists().notEmpty().custom(notInPast),
      check('clockId', 'clockId must exist!').exists().notEmpty(),
      check('masterId', 'masterId must exist!').exists().notEmpty(),
    ]
  }
}

exports.ordersController = new OrdersController(Order)
