const { Router } = require('express')
const { usersController } = require('../controllers/usersController')


const router = Router()

router.get('/', async (req, res) => usersController.getAll(req, res))

router.put('/:id', usersController.putValidators(), async (req, res) => usersController.put(req, res))
router.post('/', usersController.postValidators(), async (req, res) => usersController.post(req, res))
router.delete('/:id', async (req, res) => usersController.delete(req, res))

module.exports = router
