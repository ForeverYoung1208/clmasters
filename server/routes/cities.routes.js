const { Router } = require('express')

const { citiesController } = require('../controllers/citiesController')

const router = Router()

router.get('/', citiesController.getAllValidators(), async(req,res)=>citiesController.getAll(req,res))

module.exports = router