const { Router } = require('express')
const { usersController } = require('../controllers/usersController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')
const { encodePassword } = require('../middleware/encodePassword')


const router = Router()

router.get(
  '/',
  async (req, res) => usersController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  usersController.postValidators(),
  encodePassword,          // middleware to encode plain password to hashed one
  async (req, res) => usersController.put(req, res)
)

router.post(
  '/',
  accessTokenToEmail,
  usersController.postValidators(),
  encodePassword,          // middleware to encode plain password to hashed one
  async (req, res) => usersController.post(req, res)
)


router.delete(
  '/:id',
  accessTokenToEmail,
  async (req, res) => usersController.delete(req, res)
)

module.exports = router
