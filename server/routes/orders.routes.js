const { Router } = require('express')
const { ordersController } = require('../controllers/ordersController')


const router = Router()

router.get('/', async (req, res) => ordersController.getAll(req, res))
router.put('/:id', ordersController.putValidators(), async (req, res) => ordersController.put(req, res))
router.post('/', ordersController.postValidators(), async (req, res) => ordersController.post(req, res))

module.exports = router
