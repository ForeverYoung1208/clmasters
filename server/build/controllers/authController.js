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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
const { User } = require('../models');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const TokenStorage = require('../shared/tokenStorage');
const { noTimestamps } = require('../shared/services');
const { OAuth2Client } = require('google-auth-library');
require('dotenv').config();
const _tokenStorage = new TokenStorage();
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const JWTSECRET = process.env.SECUR_JWTSECRET;
const JWTSECRET_REFRESH = process.env.SECUR_JWTSECRET_REFRESH;
const USER_DEFAULT_PASSWORD = 'verySecretNoPassword_%d!@%&$*&34tg%';
class AuthController {
    constructor(tokenStorage) {
        this.tokenStorage = tokenStorage;
    }
    loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(401).json({ errors: errors.array() });
            try {
                const { email, password } = req.body;
                const user = yield User.authenticate(email, password);
                if (user.error)
                    return res.status(401).json({ message: 'Wrong credentials.' });
                const accessToken = this.generateAccessToken(user.email);
                const refreshToken = this.generateRefreshToken(user.email);
                const _a = user.dataValues, { password: wipedPassword } = _a, userDataNoPassword = __rest(_a, ["password"]);
                res
                    .status(200)
                    .json({ user: Object.assign(Object.assign({}, userDataNoPassword), { accessToken, refreshToken }) });
            }
            catch (e) {
                res
                    .status(401)
                    .json({
                    message: 'Something wrong at AuthController/loginUser (server error), ' +
                        e.message,
                });
            }
        });
    }
    loginByGoogleToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { tokenId } = req.body;
            const client = new OAuth2Client(CLIENT_ID);
            const ticket = yield client.verifyIdToken({
                idToken: tokenId,
                audience: CLIENT_ID,
            });
            const { email, name } = ticket.getPayload();
            if (!email)
                return res.status(400).json({ message: 'No email given by google auth' });
            let user = yield User.getByEmail(email);
            if (!user.email) {
                user = yield User.create({ name, email, password: USER_DEFAULT_PASSWORD, isAdmin: false });
            }
            const _a = user.dataValues, { password: wipedPassword } = _a, userDataNoPassword = __rest(_a, ["password"]);
            const accessToken = this.generateAccessToken(email);
            const refreshToken = this.generateRefreshToken(email);
            res
                .status(200)
                .json({ user: Object.assign(Object.assign({}, userDataNoPassword), { accessToken, refreshToken }) });
        });
    }
    refreshTokens(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const refreshTokenGiven = req.body.refreshToken;
            if (!refreshTokenGiven || !this.tokenStorage.find(refreshTokenGiven)) {
                return res.status(401).json({ message: 'Refresh token not found' });
            }
            this.tokenStorage.delete(refreshTokenGiven);
            jwt.verify(refreshTokenGiven, JWTSECRET_REFRESH, (err, decoded) => {
                if (err)
                    return res.status(401).json({ message: 'Bad refresh token' });
                const newAccessToken = this.generateAccessToken(decoded.userEmail);
                const newRefreshToken = this.generateRefreshToken(decoded.userEmail);
                res.status(201).json({ newAccessToken, newRefreshToken });
            });
        });
    }
    byEmailFromToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.userEmail;
            if (!email)
                return res
                    .status(403)
                    .json({ message: 'no email - maybe, bad access token' });
            const user = yield User.getByEmail(email);
            const _a = user.dataValues, { password: wipedPassword } = _a, userDataNoPassword = __rest(_a, ["password"]);
            return res
                .status(200)
                .json({ user: Object.assign({}, noTimestamps(userDataNoPassword)) });
        });
    }
    generateRefreshToken(userEmail) {
        const refreshToken = jwt.sign({ userEmail }, JWTSECRET_REFRESH);
        this.tokenStorage.push(refreshToken);
        return refreshToken;
    }
    generateAccessToken(userEmail) {
        const accessToken = jwt.sign({ userEmail }, JWTSECRET, { expiresIn: '30d' });
        return accessToken;
    }
    loginUserValidators() {
        return [
            check('email', 'Email is invalid').isEmail(),
            check('password', 'Must be longer than 3 chars!').isLength({ min: 3 }),
        ];
    }
}
exports.authController = new AuthController(_tokenStorage);
//# sourceMappingURL=authController.js.map