const { Router } = require('express')
const { paymentController } = require('../controllers/paymentController')

const router = Router()

router.post(
  '/createSession',
  // paymentController.loginUserValidators(),

  (req, res) => paymentController.createPaymentSession(req, res)
)

module.exports = router
