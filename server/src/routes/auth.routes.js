const { Router } = require('express')
const { authController } = require('../controllers/authController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')

// import { Router } from 'express'
// import { authController } from 'src/controllers/authController'
// import { accessTokenToEmail } from 'src/middleware/accessTokenToEmail'
// import routes from '.'

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

router.post(
  '/byGoogleToken',
  (req, res) => authController.loginByGoogleToken(req, res)
)


module.exports = router
// export default router