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
const { User } = require('../models');
const checkEmailIsAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail } = req;
    if (!userEmail)
        return res.status(401).json({ error: 'no email provided' });
    const user = yield User.getByEmail(userEmail);
    if (!user.isAdmin)
        return res.status(401).json({ error: 'not authorized' });
    next();
});
exports.checkEmailIsAdmin = checkEmailIsAdmin;
//# sourceMappingURL=checkEmailIsAdmin.js.map