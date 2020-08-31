const { Clock } = require('../models/index')
const { CRUDController } = require('./common/CRUDController')
class ClocksController extends CRUDController{
  constructor(model) {
    super(model)
  }
}
const clocksController = new ClocksController(Clock)

exports.clocksController = clocksController