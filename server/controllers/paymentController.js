require('dotenv').config()

const { validationResult } = require('express-validator')
const STRIPE_KEY_SECRET = process.env.STRIPE_KEY_SECRET
const stripe = require('stripe')(STRIPE_KEY_SECRET)

const APP_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_DOMAIN
    : process.env.DEVELOPMENT_DOMAIN

class PaymentController {
  async createPaymentSession(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(401).json({ errors: errors.array() })
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'TEST Stubborn Attachments', //TODO: change!!!
                images: ['https://i.imgur.com/EHyR2nP.png'], //TODO: change!!!
              },
              unit_amount: 200, //TODO: change!!!
            },
            quantity: 3, //TODO: change!!!
          },
        ],
        mode: 'payment',
        success_url: `${APP_DOMAIN}/info/?success=true`,
        cancel_url: `${APP_DOMAIN}/info/?canceled=true`,
      })
      res.json({ id: session.id })

      // res.status(200)
    } catch (e) {
      res.status(401).json({
        message:
          'Something wrong at PaymentController (server error), ' + e.message,
      })
    }
  }
}

exports.paymentController = new PaymentController()
