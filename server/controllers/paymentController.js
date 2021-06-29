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
                images: [order.thumbnailUrl],
              },
              unit_amount: +order.price * 100,
            },
            quantity: 1,
          },
        ],
        metadata: {
          orderId: order.id
        },
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
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      if (session.payment_status!=='paid') throw new Error({message:'something wrong - session payment status !== paid'})

      const order = Order.findByPk(session.metadata.orderId)
      
      TODO: Implement!!!
      //////
      order.payedDoneOnSum(session.amount_total / 100)
      //////
      
      
      console.log('checkout.session.completed [session]:', session)
    }
    
    if (event.type === 'charge.succeeded') {
      console.log('charge.succeeded [event]', event)
    }
    
   
    // Return a response to acknowledge receipt of the event
    res.json({ received: true })

  }

  createPaymentSessionValidators() {
    return [check('orderId', 'orderId must be specified!').isInt()]
  }
}

exports.paymentController = new PaymentController()
