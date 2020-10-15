const { Router } = require('express')
const { ordersController } = require('../controllers/ordersController')
const { verifyAccessToken } = require('../middleware/verifyAccessToken')


const router = Router()

router.get('/query', async (req, res) => ordersController.getAllByParam(req, res))
router.get('/', async (req, res) => ordersController.getAll(req, res))
router.put('/:id', ordersController.putValidators(), async (req, res) => ordersController.put(req, res))
router.post('/', ordersController.postValidators(), async (req, res) => ordersController.post(req, res))
router.delete('/:id', verifyAccessToken,  async (req, res) => ordersController.delete(req, res))

module.exports = router
