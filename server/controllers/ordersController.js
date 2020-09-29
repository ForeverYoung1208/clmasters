const { check } = require('express-validator')
const { Order } = require('../models')
const { CRUDController } = require('./common/CRUDController')

class OrdersController extends CRUDController{
  constructor(model){
    super(model)
  }

  putValidators() {
    return [
      check('onTime', 'onTime must exist!').exists().notEmpty(),
      check('userId', 'userId must exist!').exists().notEmpty(),
      check('clockId', 'clockId must exist!').exists().notEmpty(),
      check('masterId', 'masterId must exist!').exists().notEmpty(),
    ]
  }  

  postValidators() {
    return [
      check('onTime', 'onTime must exist!').exists().notEmpty(),
      check('userId', 'userId must exist!').exists().notEmpty(),
      check('clockId', 'clockId must exist!').exists().notEmpty(),
      check('masterId', 'masterId must exist!').exists().notEmpty(),
    ]
  }  

}


exports.ordersController = new OrdersController(Order)