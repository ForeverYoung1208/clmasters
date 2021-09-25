"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require('dotenv').config();
const { check, validationResult } = require('express-validator');
const STRIPE_KEY_SECRET = process.env.STRIPE_KEY_SECRET;
const stripe = require('stripe')(STRIPE_KEY_SECRET);
const { Order } = require('../models/index');
const CLIENT_DOMAIN = process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_PRODUCTION_DOMAIN
    : process.env.CLIENT_DEVELOPMENT_DOMAIN;
const APP_URL = process.env.NODE_ENV === 'production'
    ? process.env.APP_URL_PROD
    : process.env.APP_URL_DEV;
const NO_IMAGE_PICTURE_ROUTE = 'https://res.cloudinary.com/fyoung-dp-ua/image/upload/v1625334309/clMasters/static/no_image_dxpjjo.png';
const ENDPOINT_SECRET = process.env.NODE_ENV === 'production'
    ? process.env.PRODUCTION_STRIPE_ENDPOINT_SECRET
    : process.env.DEVELOPMENT_STRIPE_ENDPOINT_SECRET;
class PaymentController {
    createPaymentSession(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            const { orderId } = req.query;
            const order = yield Order.findByPk(orderId);
            if (!order)
                return res.status(400).json({
                    message: `Order with Id ${orderId} not found in the database!`,
                });
            if (!errors.isEmpty())
                return res.status(401).json({ errors: errors.array() });
            try {
                const images = [order.thumbnailUrl || NO_IMAGE_PICTURE_ROUTE];
                const session = yield stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: `clock repair (order Id ${order.id})`,
                                    images,
                                },
                                unit_amount: (+order.price - order.payedSum) * 100,
                            },
                            quantity: 1,
                        },
                    ],
                    metadata: {
                        orderId: order.id,
                    },
                    mode: 'payment',
                    success_url: `${CLIENT_DOMAIN}/info/payment/showSuccess?order_id=${order.id}`,
                    cancel_url: `${CLIENT_DOMAIN}/info/payment/showFail?order_id=${order.id}`,
                });
                res.json({ id: session.id });
            }
            catch (e) {
                res.status(400).json({
                    error: 'Something wrong at PaymentController (server error), ' + e.message,
                });
            }
        });
    }
    paymentWebhook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const sig = req.headers['stripe-signature'];
            let event;
            try {
                event = stripe.webhooks.constructEvent(req.rawBody, sig, ENDPOINT_SECRET);
            }
            catch (err) {
                res.status(400).message(`Webhook Error: ${err.message}`);
            }
            if (event.type === 'checkout.session.completed') {
                const session = event.data.object;
                if (session.payment_status === 'paid') {
                    const order = yield Order.findByPk(session.metadata.orderId);
                    yield order.payedDoneOnSum(+session.amount_total / 100);
                    res.status(200).json({ received: true });
                }
                else {
                    console.log('payment error - [session.payment_status]', session.payment_status);
                    res.status(200).json({ received: false });
                }
            }
        });
    }
    createPaymentSessionValidators() {
        return [check('orderId', 'orderId must be specified!').isInt()];
    }
}
exports.paymentController = new PaymentController();
//# sourceMappingURL=paymentController.js.map