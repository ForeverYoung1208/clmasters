const { Router } = require('express')
const { paymentController } = require('../controllers/paymentController')

const router = Router()


router.post(
  '/payment',
  // paymentController.loginUserValidators(),
  
  (req, res) => paymentController.loginUser(req, res)
)


module.exports = router