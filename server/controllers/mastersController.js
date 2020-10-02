const { check } = require('express-validator')
const { Master } = require('../models')
const { CRUDController } = require('./common/CRUDController')

class MastersController extends CRUDController{
  constructor(model){
    super(model)
  }

  // real delete !!!
  async delete(req, res) { 
    const { id } = req.params

    try {
      const deletedRows = await this.model.destroy({
        where: { id },
        force: true         // real deletion - to check FK constraints!!!
      })
      
      if (deletedRows<1) return res.status(400).json({
        message: `CDUD controller: model with id:${id} can not be deleted`
      })
      return res.sendStatus(204)
      
    } catch (error) {
      
      return res.status(400).json({
        message: `CDUD controller: error with deletion model id:${id}: ${error.name}`
      })
    }


    
  }

  putValidators() {
    return [
      check('name', 'name must be not empty!').exists().notEmpty(),
      check('cityId', 'cityId must exist!').exists().notEmpty(),
    ]
  }  

  postValidators() {
    return [
      check('name', 'name must be not empty!').exists().notEmpty(),
      check('cityId', 'cityId must exist!').exists().notEmpty(),
    ]
  }    
}


exports.mastersController = new MastersController(Master)