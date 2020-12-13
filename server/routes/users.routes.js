import { Router } from 'express'
import usersController from '../controllers/usersController.js'
import accessTokenToEmail from '../middleware/accessTokenToEmail.js'
import encodePassword from '../middleware/encodePassword.js'


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

export default router
