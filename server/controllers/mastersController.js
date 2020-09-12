const { Master } = require('../models')
const { CRUDController } = require('./common/CRUDController')

class MastersController extends CRUDController{
  constructor(model){
    super(model)
  }
}


exports.mastersController = new MastersController(Master)