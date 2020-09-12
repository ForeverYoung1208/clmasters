const { Router } = require('express')

const { citiesController } = require('../controllers/citiesController')
const { decodeTokenToEmail } = require('../middleware/decodeTokenToEmail')

const router = Router()

router.get('/', async (req, res) => citiesController.getAll(req, res))
router.post('/:id', decodeTokenToEmail, async (req, res) => citiesController.post(req, res))


module.exports = router