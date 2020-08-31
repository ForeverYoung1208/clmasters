const { Router } = require('express')

const { preordersController } = require('../controllers/preordersController')

const router = Router()

router.post('/', preordersController.postValidators(), async(req,res)=> await preordersController.post(req,res))

module.exports = router
