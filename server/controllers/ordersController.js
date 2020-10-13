const { check, validationResult } = require('express-validator')
const { Order, User } = require('../models')
const { CRUDController } = require('./common/CRUDController')
const { noTimestamps } = require('../shared/services')

class OrdersController extends CRUDController{
  constructor(model){
    super(model)
  }

  async post(req, res) { 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })    
    
    const data = req.body
    if (!data.userId) {
      var [user] = await User.findOrCreate({
        where: { email: data.email },
        defaults: { name: data.name }
      })
      user.name = data.name
      user.save()
      data.userId = user.id
    }

    const newOrder = await Order.create(data)
    if (!newOrder) return res.status(400).json({
      message: 'Orders controller: not created'
    })

    return res.status(200).json({
      ...noTimestamps(newOrder.dataValues),
      user: {
        name: user.name,
        email: user.email
      }
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
        {'$User.email$':emailQuery.email}],
      include: [{
        model: User,
        as: 'User'          
      }],
      order: [                  // that is sortring order, not our order entity
        ['id', 'ASC']
      ]
    })

    const data = orders.map((order) => {

      const { User, ...newOrder } = order
      const orderDataValues = noTimestamps(newOrder.dataValues)
      orderDataValues.user = {
        name: User.dataValues.name,
        email: User.dataValues.email
      }

      return orderDataValues
    })
    
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