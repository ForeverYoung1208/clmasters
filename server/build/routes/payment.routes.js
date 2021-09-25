"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paymentController_1 = require("../controllers/paymentController");
const router = (0, express_1.Router)();
router.post('/createSession', paymentController_1.paymentController.createPaymentSessionValidators(), (req, res) => paymentController_1.paymentController.createPaymentSession(req, res));
router.post('/webhook', (req, res) => paymentController_1.paymentController.paymentWebhook(req, res));
module.exports = router;
//# sourceMappingURL=payment.routes.js.map