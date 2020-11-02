const { check, validationResult } = require('express-validator')
const { Order, User, Master, Clock, City } = require('../models')
const { CRUDController } = require('./common/CRUDController')
const { noTimestamps, timeStrToWords } = require('../shared/services')
const sendEmail = require('../shared/mailjet')

// const { format } = require('date-fns')
const { uk } = require('date-fns/locale')
const { utcToZonedTime, format } = require('date-fns-tz')


class OrdersController extends CRUDController{
  constructor(model){
    super(model)
  }

  // put(req, res) goes to parent CRUDController

  async post(req, res) { 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })    
    
    const data = req.body
    let user

    if (data.userId) {
      // user was logged in (administrator) - so we have userId
      user = await User.findByPk(data.userId)
    } else {
      // user wasn't logged in (customer) - need to find by email or create
      [user] = await User.findOrCreate({
        where: { email: data.email },
        defaults: { name: data.name }
      })
      user.name = data.name
      user.save()
      data.userId = user.id
    }

    const _newOrder = await Order.create(data)
    if (!_newOrder) return res.status(500).json({
      message: 'Orders controller: not created'
    })

    const newOrders = await Order.findAll({
      where: {id: _newOrder.dataValues.id },
      include: [
        {
          model: User,
          as: 'user'
        }, {
          model: Master,
          as: 'master',
          include: [
            {
              model: City,
              as: 'city'
            }
          ]
        }, {
          model: Clock,
          as: 'clock'
        }
      ],
      order: [                  // that is sortring order, not our order entity
        ['id', 'ASC']
      ]
    })

    const { master, clock } = newOrders[0]
    const ukrTimeStr = format(
      newOrders[0].onTime,
      'dd.MM.yyyy HH:mm',
      { locale: uk, timeZone: 'Europe/Kiev' }
    )

    console.log(ukrTimeStr)


    const emailResult = await sendEmail(
      {
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
        `
      }
    )

    return res.status(201).json({
      ...noTimestamps(newOrders[0].dataValues),
      user: {
        name: user.name,
        email: user.email
      },
      isEmailSent: emailResult.response.ok
    })
  }

  async getAllByParam(req, res) {
    let masterQuery = req.query
    let emailQuery = {}
    if (req.query.email) {
      masterQuery = {}
      emailQuery = req.query 
    }

    const orders = await Order.findAll({
      where: [
        masterQuery,
        {'$user.email$':emailQuery.email}],
      include: [
        {
          model: User,
          as: 'user'
        }, {
          model: Master,
          as: 'master',
          include: [
            {
              model: City,
              as: 'city'
            }
          ]
        }, {
          model: Clock,
          as: 'clock'
        }
      ],
      order: [                  // that is sortring order, not our order entity
        ['id', 'ASC']
      ]
    })

    const data = orders.map((order) => noTimestamps(order.dataValues))

    return (res.status(200).json(data))
  }  
  

  putValidators() {
    return [
      check('onTime', 'onTime must exist!').exists().notEmpty(),
      check('clockId', 'clockId must exist!').exists().notEmpty(),
      check('masterId', 'masterId must exist!').exists().notEmpty(),
    ]
  }  

  postValidators() {
    return [
      check('onTime', 'onTime must exist!').exists().notEmpty(),
      check('clockId', 'clockId must exist!').exists().notEmpty(),
      check('masterId', 'masterId must exist!').exists().notEmpty(),
    ]
  }  

}


exports.ordersController = new OrdersController(Order)