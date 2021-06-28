require('dotenv').config()

const { check, validationResult } = require('express-validator')
const STRIPE_KEY_SECRET = process.env.STRIPE_KEY_SECRET
const stripe = require('stripe')(STRIPE_KEY_SECRET)
const { Order } = require('../models/index')

const APP_DOMAIN =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_DOMAIN
    : process.env.DEVELOPMENT_DOMAIN

const ENDPOINT_SECRET =
  process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_STRIPE_ENDPOINT_SECRET
    : process.env.DEVELOPMENT_STRIPE_ENDPOINT_SECRET

// const APP_PORT =
//   process.env.NODE_ENV === 'production'
//     ? process.env.APP_PORT_PROD
//     : process.env.APP_PORT_DEV

class PaymentController {
  async createPaymentSession(req, res) {
    const errors = validationResult(req)
    const { orderId } = req.query
    const order = await Order.findByPk(orderId)

    if (!order)
      return res.status(400).json({
        message: `Order with Id ${orderId} not found in the database!`,
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
              unit_amount: +order.price * 100, //TODO: change!!!
            },
            quantity: 1, //TODO: change!!!
          },
        ],
        mode: 'payment',
        success_url: `${APP_DOMAIN}/info/payment/successfull`,
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

  async paymentWebhook(req, res) {
    const sig = req.headers['stripe-signature']
    let event
    try {
      event = stripe.webhooks.constructEvent(req.rawBody, sig, ENDPOINT_SECRET)
    } catch (err) {
      res.status(400).message(`Webhook Error: ${err.message}`)
    }

    // Handle the event
    const payment = {}
    switch (event.type) {
    case 'payment_intent.succeeded':
      payment.intent = event.data.object
      console.log('PaymentIntent was successful!')
      break
    case 'payment_method.attached':
      payment.method = event.data.object
      console.log('PaymentMethod was attached to a Customer!')
      break
      
        TODO ... handle other event types
        
    default:
      console.log(`Unhandled event type ${event.type}`)
    }
    
    console.log('[payment]', payment)

    // Return a response to acknowledge receipt of the event
    res.json({ received: true })

  }

  createPaymentSessionValidators() {
    return [check('orderId', 'orderId must be specified!').isInt()]
  }
}

exports.paymentController = new PaymentController()
