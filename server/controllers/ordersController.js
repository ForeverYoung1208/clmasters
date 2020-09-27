const { check } = require('express-validator')
const { Order } = require('../models')
const { CRUDController } = require('./common/CRUDController')

class OrdersController extends CRUDController{
  constructor(model){
    super(model)
  }

  putValidators() {
    return [
      check('onTime', 'onTime must exist!').exists(),
      check('userId', 'userId must exist!').exists(),
      check('clockId', 'clockId must exist!').exists(),
      check('masterId', 'masterId must exist!').exists(),
    ]
  }  

  postValidators() {
    return this.putValidators()
  }  

}


exports.ordersController = new OrdersController(Order)