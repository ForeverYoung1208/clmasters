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
const bcrypt = require('bcryptjs');
const SALTROUNDS = parseInt(process.env.SECUR_SALTROUNDS);
const encodePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.password) {
        const passwordPalain = req.body.password;
        req.body.password = yield bcrypt.hash(passwordPalain, SALTROUNDS);
    }
    next();
});
exports.encodePassword = encodePassword;
//# sourceMappingURL=encodePassword.js.map