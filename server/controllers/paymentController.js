require('dotenv').config()

const { check, validationResult } = require('express-validator')
const STRIPE_KEY_SECRET = process.env.STRIPE_KEY_SECRET
const stripe = require('stripe')(STRIPE_KEY_SECRET)
const { Order } = require('../models/index')

const APP_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_DOMAIN
    : process.env.DEVELOPMENT_DOMAIN

class PaymentController {
  async createPaymentSession(req, res) {
    const errors = validationResult(req)
    const { orderId } = req.query
    const order = await Order.findByPk(orderId)
    console.log('[orderId]', orderId)
    console.log('[order]', order)
    
    if (!order)
      return res.status(400).json({
        message: `Order with Id ${orderId} not found in the database!`
      })
    
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
                name: `clock repair (order Id ${order.id})`,
                images: [order.thumbnailUrl], //TODO: change!!!
              },
              unit_amount: +order.price*100, //TODO: change!!!
            },
            quantity: 1, //TODO: change!!!
          },
        ],
        mode: 'payment',
        success_url: `${APP_DOMAIN}/info/payment/successful`,
        cancel_url: `${APP_DOMAIN}/info/payment/canceled`,
      })
      res.json({ id: session.id })

      // res.status(200)
    } catch (e) {
      res.status(400).json({
        message:
          'Something wrong at PaymentController (server error), ' + e.message,
      })
    }
  }
  
  createPaymentSessionValidators() {
    return [
      check('orderId', 'orderId must be specified!').isInt(),
    ]
  }
}

exports.paymentController = new PaymentController()
