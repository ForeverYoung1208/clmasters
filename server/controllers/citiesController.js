import { check } from 'express-validator'
import models from '../models/index.js'
import CRUDController from './common/CRUDController.js'

const { City } = models

class CitiesController extends CRUDController{
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
      
      if (deletedRows<1) return res.status(500).json({
        message: `CDUD controller: model with id:${id} can not be deleted`
      })
      return res.sendStatus(204)
      
    } catch (error) {
      
      return res.status(500).json({
        message: `CDUD controller: error with deletion model id:${id}: ${error.name}`
      })
    }
  }

  putValidators() {
    return [
      check('name', 'name must be not empty!').exists().notEmpty(),
    ]
  }  

  postValidators() {
    return [
      check('name', 'name must be not empty!').exists().notEmpty(),
    ]
  }    
}

export default new CitiesController(City)