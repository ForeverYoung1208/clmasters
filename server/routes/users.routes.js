const { Router } = require('express')
const { usersController } = require('../controllers/usersController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')


const router = Router()

router.get(
  '/',
  async (req, res) => usersController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  usersController.putValidators(),
  async (req, res) => usersController.put(req, res)
)

router.post(
  '/',
  usersController.postValidators(),
  async (req, res) => usersController.post(req, res)
)

router.delete(
  '/:id',
  accessTokenToEmail,
  async (req, res) => usersController.delete(req, res)
)

module.exports = router
