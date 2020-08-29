const { City } = require('../models/index')
const { CRUDController } = require('./CRUDController')
class CitiesController extends CRUDController{
  constructor(model){
    super(model)
  }

  // test(){
  //   alert('test OK')
  // }
}
const citiesController = new CitiesController(City)

exports.citiesController = citiesController;