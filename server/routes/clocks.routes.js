const { Router } = require('express')

const { clocksController } = require('../controllers/clocksController')

const router = Router()

// read all
router.get('/', clocksController.getAllValidators(), async(req,res)=>clocksController.getAll(req,res))

module.exports = router