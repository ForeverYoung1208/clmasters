const { Router } = require('express')
const { paymentController } = require('../controllers/paymentController')

const router = Router()

router.post(
  '/createSession',
  paymentController.createPaymentSessionValidators(),
  (req, res) => paymentController.createPaymentSession(req, res)
)

router.post(
  '/webhook',
  (req, res) => paymentController.paymentWebhook(req, res)
)
module.exports = router
