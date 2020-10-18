const { Router } = require('express')
const { authController } = require('../controllers/authController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')

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


module.exports = router