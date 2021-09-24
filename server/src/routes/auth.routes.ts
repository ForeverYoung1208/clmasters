// const { Router } = require('express')
const { authController } = require('../controllers/authController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')

import { Request, Response, Router } from 'express'
// import { authController } from 'src/controllers/authController'
// import { accessTokenToEmail } from 'src/middleware/accessTokenToEmail'
// import routes from '.'

const router = Router()


router.post(
  '/login',
  authController.loginUserValidators(),
  (req: Request, res: Response) => authController.loginUser(req, res)
)

router.get(
  '/byToken',
  accessTokenToEmail,
  (req: Request, res: Response) => authController.byEmailFromToken(req, res) //TEMPORARY ANY!!
)

router.post(
  '/refreshTokens',
  (req: Request, res: Response) => authController.refreshTokens(req, res) //TEMPORARY ANY!!
)

router.post(
  '/byGoogleToken',
  (req: Request, res: Response) => authController.loginByGoogleToken(req, res) //TEMPORARY ANY!!
)


module.exports = router
