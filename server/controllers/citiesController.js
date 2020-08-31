const { City } = require('../models/index')
const { CRUDController } = require('./common/CRUDController')
class CitiesController extends CRUDController{
  constructor(model){
    super(model)
  }
}

const citiesController = new CitiesController(City)

exports.citiesController = citiesController