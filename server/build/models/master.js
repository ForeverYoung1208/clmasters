'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PaginatedModel: Model } = require('./PaginatedModel/PaginatedModel');
const { timestrToMSec } = require('../shared/services');
const roundToMinute = require('date-fns/roundToNearestMinutes');
module.exports = (sequelize, DataTypes) => {
    class Master extends Model {
        static freeMastersForOrder(preorderData, excludeOrderId) {
            return __awaiter(this, void 0, void 0, function* () {
                const { cityId, orderDateTimeStr, clockTypeId } = preorderData;
                const Clock = sequelize.model('Clock');
                const Order = sequelize.model('Order');
                const [clockType, maxRepairTimeMsec, mastersInCity] = yield Promise.all([
                    Clock.findByPk(clockTypeId),
                    Clock.maxRepairTimeMsec(),
                    this.findAll({
                        where: {
                            cityId,
                        },
                    }),
                ]);
                const orderDateTimeStarts = new Date(orderDateTimeStr);
                const orderDateTimeEnds = new Date(orderDateTimeStarts.valueOf() +
                    timestrToMSec(clockType.dataValues.repairTime));
                const nearestOrders = yield Order.withinInterval({
                    dateFrom: orderDateTimeStarts,
                    dateTo: new Date(orderDateTimeStarts.valueOf() + maxRepairTimeMsec),
                });
                const busyMasters = nearestOrders.reduce((acc, order) => {
                    if (+order.id === +excludeOrderId)
                        return acc;
                    const { dataValues: existingOrder, clock: { dataValues: existingClock }, } = order;
                    const existingOrderEnds = new Date(existingOrder.onTime.valueOf() +
                        timestrToMSec(existingClock.repairTime));
                    if (roundToMinute(orderDateTimeStarts) <
                        roundToMinute(existingOrderEnds) &&
                        roundToMinute(orderDateTimeEnds) > roundToMinute(existingOrder.onTime)) {
                        acc.push(+existingOrder.masterId);
                    }
                    return acc;
                }, []);
                const freeMastersInCity = mastersInCity.filter(({ dataValues: masterInCity }) => !busyMasters.includes(+masterInCity.id));
                return freeMastersInCity;
            });
        }
        static associate(models) {
            this.belongsTo(models.City, {
                as: 'city',
                foreignKey: { name: 'cityId' },
            });
            this.hasMany(models.Order, {
                as: 'orders',
                foreignKey: { name: 'masterId' },
            });
        }
    }
    Master.init({
        name: DataTypes.STRING,
        cityId: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        deletedAt: DataTypes.DATE,
        rating: DataTypes.INTEGER,
        hourRate: DataTypes.DECIMAL,
        isActive: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Master',
        paranoid: true,
    });
    return Master;
};
//# sourceMappingURL=master.js.map