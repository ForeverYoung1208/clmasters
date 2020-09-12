const { Router } = require('express')

const { clocksController } = require('../controllers/clocksController')

const router = Router()

router.get('/', async(req,res)=>clocksController.getAll(req,res))

module.exports = router