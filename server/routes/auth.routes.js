import { Router } from 'express'
import authController from '../controllers/authController.js'
import accessTokenToEmail from '../middleware/accessTokenToEmail.js'

const router = Router()


router.post(
  '/login',
  authController.loginUserValidators(),
  (req, res) => authController.loginUser(req, res)
)

router.get(
  '/byToken',
  accessTokenToEmail,
  (req, res) => authController.byEmailFromToken(req, res)
)

router.post(
  '/refreshTokens',
  (req, res) => authController.refreshTokens(req, res)
)


export default router