const { Router } = require('express')
const { usersController } = require('../controllers/usersController')


const router = Router()

router.get('/', async (req, res) => usersController.getAll(req, res))

module.exports = router
