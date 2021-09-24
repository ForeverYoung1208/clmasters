import { Request, Response, Router } from 'express'
const { paymentController } = require('../controllers/paymentController')

const router = Router()

router.post(
  '/createSession',
  paymentController.createPaymentSessionValidators(),
  (req: Request, res: Response) => paymentController.createPaymentSession(req, res)
)

router.post(
  '/webhook',
  (req: Request, res: Response) => paymentController.paymentWebhook(req, res)
)
module.exports = router
