const { Clock } = require('../models/index')
const { CRUDController } = require('./CRUDController')
class ClocksController extends CRUDController{
  constructor(model){
    super(model)
  }

  // test(){
  //   alert('test OK')
  // }
}
const clocksController = new ClocksController(Clock)

exports.clocksController = clocksController;