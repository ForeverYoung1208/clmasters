const { Router } = require('express')
const { mastersController } = require('../controllers/mastersController')

const router = Router()

router.get('/', async (req, res) => mastersController.getAll(req, res))

module.exports = router