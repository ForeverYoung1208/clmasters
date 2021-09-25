"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const accessTokenToEmail_1 = require("../middleware/accessTokenToEmail");
const router = (0, express_1.Router)();
router.post('/login', authController_1.authController.loginUserValidators(), (req, res) => authController_1.authController.loginUser(req, res));
router.get('/byToken', accessTokenToEmail_1.accessTokenToEmail, (req, res) => authController_1.authController.byEmailFromToken(req, res));
router.post('/refreshTokens', (req, res) => authController_1.authController.refreshTokens(req, res));
router.post('/byGoogleToken', (req, res) => authController_1.authController.loginByGoogleToken(req, res));
module.exports = router;
//# sourceMappingURL=auth.routes.js.map