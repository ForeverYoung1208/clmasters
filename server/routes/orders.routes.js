const { Router } = require('express')
const { ordersController } = require('../controllers/ordersController')


const router = Router()

router.get('/', async (req, res) => ordersController.getAll(req, res))

module.exports = router
