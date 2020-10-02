const { Router } = require('express')
const { mastersController } = require('../controllers/mastersController')

const router = Router()

router.get('/', async (req, res) => mastersController.getAll(req, res))

router.put('/:id', mastersController.putValidators(), async (req, res) => mastersController.put(req, res))
router.post('/', mastersController.postValidators(), async (req, res) => mastersController.post(req, res))
router.delete('/:id', async (req, res) => mastersController.delete(req, res))

module.exports = router