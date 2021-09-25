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
const checkMasterIsFree = (sequelize, order) => __awaiter(void 0, void 0, void 0, function* () {
    const { masterId, onTime, clockId } = order.dataValues;
    const Master = sequelize.model('Master');
    const master = yield Master.findByPk(masterId);
    const cityId = master.cityId;
    const freeMasters = yield Master.freeMastersForOrder({
        cityId,
        orderDateTimeStr: onTime,
        clockTypeId: clockId,
    }, order.id);
    const isGivenMasterFree = freeMasters.some((m) => {
        return +m.dataValues.id === +masterId;
    });
    if (!isGivenMasterFree)
        return Promise.reject(new Error('The master is busy at given time'));
});
module.exports = { checkMasterIsFree };
//# sourceMappingURL=orderValidators.js.map