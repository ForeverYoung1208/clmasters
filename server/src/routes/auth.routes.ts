import { Request, Response, Router } from 'express'
import { authController } from '../controllers/authController'
import { accessTokenToEmail } from '../middleware/accessTokenToEmail'

const router = Router()

router.post(
  '/login',
  authController.loginUserValidators(),
  (req: Request, res: Response) => authController.loginUser(req, res)
)

router.get(
  '/byToken',
  accessTokenToEmail,
  (req: Request, res: Response) => authController.byEmailFromToken(req, res)
)

router.post(
  '/refreshTokens',
  (req: Request, res: Response) => authController.refreshTokens(req, res)
)

router.post(
  '/byGoogleToken',
  (req: Request, res: Response) => authController.loginByGoogleToken(req, res)
)


module.exports = router
