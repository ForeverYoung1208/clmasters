const { City } = require('../models/index')
const { CRUDController } = require('./common/CRUDController')
class CitiesController extends CRUDController{
  constructor(model){
    super(model)
  }

  post(req, res) { 
    // super.post(req, res)
    return res.status(501).send(`'You've been authorized, ${req.userEmail}, but city saving routine is under construction`)
  }

}

exports.citiesController = new CitiesController(City)