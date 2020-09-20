const { Order } = require('../models')
const { CRUDController } = require('./common/CRUDController')

class OrdersController extends CRUDController{
  constructor(model){
    super(model)
  }
}


exports.ordersController = new OrdersController(Order)