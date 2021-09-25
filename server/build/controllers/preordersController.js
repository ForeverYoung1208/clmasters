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
const { check, validationResult } = require('express-validator');
const { Master } = require('../models/index');
const { CRUDController } = require('./common/CRUDController');
const { notInPast } = require('./validators/customValidators');
class PreordersController extends CRUDController {
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            const { cityId, clockId, onTime } = req.body;
            const freeMasters = yield Master.freeMastersForOrder({
                cityId,
                orderDateTimeStr: onTime,
                clockTypeId: clockId,
            });
            return res.status(200).json(freeMasters);
        });
    }
    postValidators() {
        return [
            check('cityId', 'cityId must be specified!').isInt(),
            check('onTime').custom(notInPast),
            check('clockId', 'clockId must be specified!').isInt(),
        ];
    }
}
exports.preordersController = new PreordersController();
//# sourceMappingURL=preordersController.js.map