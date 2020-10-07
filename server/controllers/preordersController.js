const { check, validationResult } = require('express-validator')

const { Master } = require('../models/index')
const { CRUDController } = require('./common/CRUDController')

class PreordersController extends CRUDController{

  async post(req, res) {
    const errors = validationResult(req)  // Finds the validation errors in this request and wraps them in an object with handy functions
    console.log('[errors]', errors)
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  
    const { preorderData } = req.body
    const freeMasters = await Master.freeMastersForOrder(preorderData)

    
    return (res.status(200).json(freeMasters))
  }

  postValidators() { 
    const now = new Date
    return [
      check('preorderData.cityId', 'cityId must be specified!').isInt(),
      check('preorderData.orderDateTime', 'orderDateTime must be a date in the future')
        .isAfter( now.toISOString()),
      check('preorderData.clockTypeId', 'clockTypeId must be specified!').isInt(),
    ]
  }
}

exports.preordersController = new PreordersController()