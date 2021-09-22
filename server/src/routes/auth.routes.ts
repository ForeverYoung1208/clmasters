// const { Router } = require('express')
const { authController } = require('../controllers/authController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')

import { Router } from 'express'
// import { authController } from 'src/controllers/authController'
// import { accessTokenToEmail } from 'src/middleware/accessTokenToEmail'
// import routes from '.'

const router = Router()


router.post(
  '/login',
  authController.loginUserValidators(),
  (req:any, res:any) => authController.loginUser(req, res) //TEMPORARY ANY!!
)

router.get(
  '/byToken',
  accessTokenToEmail,
  (req:any, res:any) => authController.byEmailFromToken(req, res) //TEMPORARY ANY!!
)

router.post(
  '/refreshTokens',
  (req:any, res:any) => authController.refreshTokens(req, res) //TEMPORARY ANY!!
)

router.post(
  '/byGoogleToken',
  (req:any, res:any) => authController.loginByGoogleToken(req, res) //TEMPORARY ANY!!
)


// module.exports = router
export default router