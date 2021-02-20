const { check, validationResult } = require('express-validator')

const { Master } = require('../models/index')
const { CRUDController } = require('./common/CRUDController')
const { notInPast } = require('./validators/customValidators')

class PreordersController extends CRUDController {
  // maybe, I should refactore it to masters get call ...
  async post(req, res) {
    const errors = validationResult(req)
    console.log('[errors]', errors)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() })

    const { cityId, clockId, onTime } = req.body
    const freeMasters = await Master.freeMastersForOrder({
      cityId,
      orderDateTimeStr: onTime,
      clockTypeId: clockId,
    })

    return res.status(200).json(freeMasters)
  }

  postValidators() {
    return [
      check('cityId', 'cityId must be specified!').isInt(),
      check('onTime').custom(notInPast),
      check('clockId', 'clockId must be specified!').isInt(),
    ]
  }
}

exports.preordersController = new PreordersController()
