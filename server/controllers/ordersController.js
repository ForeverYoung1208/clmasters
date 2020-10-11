const { check } = require('express-validator')
const { Order, User } = require('../models')
const { CRUDController } = require('./common/CRUDController')

class OrdersController extends CRUDController{
  constructor(model){
    super(model)
  }

  async post(req, res) { 
    const data = req.body
    if (!data.userId) {
      var [user] = await User.findOrCreate({
        where: { email: data.email },
        defaults: { name: data.name }
      })
      user.name = data.name
      user.save()
      req.body.userId = user.id
    }
    return super.post(req, res)
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