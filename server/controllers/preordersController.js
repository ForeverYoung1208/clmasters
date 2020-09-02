const { check, validationResult } = require('express-validator')

const { Master } = require('../models/index')
const { CRUDController } = require('./common/CRUDController')

class PreordersController extends CRUDController{

  async post(req, res) {
    const errors = validationResult(req)  // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  
    const { preorderData } = req.body
    const {cityId, orderDateTime:orderDateTimeStr, repairTime:repairTimeStr} = preorderData

    const freeMasters = await Master.freeMastersAfter({cityId, orderDateTimeStr, repairTimeStr})
    
    return (res.status(200).json(freeMasters))
  }

  postValidators() { 
    return [
      check('preorderData.cityId', 'cityId must be specified!').isInt(),
      check('preorderData.orderDateTime', 'orderDateTime must be a date').isString(),
      check('preorderData.repairTime', 'repairTime must be specified!').isString(),
    ]
  }
}

exports.preordersController = new PreordersController()