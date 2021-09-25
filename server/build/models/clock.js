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
module.exports = (sequelize, DataTypes) => {
    class Clock extends Model {
        static maxRepairTimeMsec() {
            return __awaiter(this, void 0, void 0, function* () {
                const maxRepairTimeClock = yield this.findOne({
                    attributes: [
                        [sequelize.fn('MAX', sequelize.col('repairTime')), 'maxTime'],
                    ],
                });
                return timestrToMSec(maxRepairTimeClock.dataValues.maxTime);
            });
        }
        static associate(models) {
            this.hasMany(models.Order, {
                as: 'orders',
                foreignKey: { name: 'clockId' },
            });
        }
    }
    Clock.init({
        type: DataTypes.STRING,
        repairTime: DataTypes.TIME,
        comment: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Clock',
        paranoid: true,
    });
    return Clock;
};
//# sourceMappingURL=clock.js.map