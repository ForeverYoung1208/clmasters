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
const { Op } = require('sequelize');
const { PaginatedModel: Model } = require('./PaginatedModel/PaginatedModel');
const { startOfDay, endOfDay } = require('date-fns');
const orderValidators = require('./validators/orderValidators');
const { makeGoogleCalendarEvent, deleteGoogleCalendarEvent, } = require('../shared/googleCalendarUtils');
const cloudinary = require('cloudinary').v2;
const EQUALITY_THRESHOLD = 0.009;
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        putToGoogleCalendar() {
            return __awaiter(this, void 0, void 0, function* () {
                let { clock, clockId, user, userId, master, masterId, comment, onTime, id, } = this;
                if (!clock)
                    clock = yield sequelize.models.Clock.findByPk(clockId);
                if (!user)
                    user = yield sequelize.models.User.findByPk(userId);
                if (!master) {
                    master = yield sequelize.models.Master.findOne({
                        where: { id: masterId },
                        include: [
                            {
                                model: sequelize.models.City,
                                as: 'city',
                            },
                        ],
                    });
                }
                const endTime = new Date(onTime.valueOf() + new Date(`1970-01-01T${clock.repairTime}Z`).valueOf());
                const eventData = {
                    summary: `Order ${id} (${clock.type} clock repair)`,
                    description: `
          ${clock.type} clock repair (${clock.repairTime}),
          city: ${master.city.name}, master:${master.name},
          user: ${user.name},
          comment:${comment} 
        `,
                    start: {
                        dateTime: onTime,
                    },
                    end: {
                        dateTime: endTime,
                    },
                };
                const { data: { id: eventId }, } = yield makeGoogleCalendarEvent(eventData);
                this.calendarEventId = eventId;
                yield this.save({ hooks: false });
            });
        }
        deleteFromGoogleCalendar() {
            return __awaiter(this, void 0, void 0, function* () {
                const { calendarEventId } = this;
                if (calendarEventId) {
                    yield deleteGoogleCalendarEvent(calendarEventId);
                }
            });
        }
        deleteFromCloudinary() {
            const { photoPublicId } = this;
            if (photoPublicId) {
                cloudinary.api.delete_resources([photoPublicId], function (error, result) {
                    if (error) {
                        console.log('cloudinary error:', error);
                        throw new Error(error);
                    }
                });
            }
        }
        checkForPhotoCleanup(order) {
            if (order._changed.has('photoPublicId') &&
                order._previousDataValues.photoPublicId) {
                cloudinary.api.delete_resources([order._previousDataValues.photoPublicId], function (error, result) {
                    if (error) {
                        console.log('cloudinary error:', error);
                        throw new Error(error);
                    }
                });
            }
        }
        isPayed() {
            return Math.abs(this.payedSum - this.price) < EQUALITY_THRESHOLD;
        }
        payedDoneOnSum(payedSum) {
            return __awaiter(this, void 0, void 0, function* () {
                this.payedSum = +this.payedSum + payedSum;
                const updatedOrder = yield this.save();
                return updatedOrder;
            });
        }
        static getAtDate(dateStr) {
            return __awaiter(this, void 0, void 0, function* () {
                const { startOfDay, endOfDay } = require('date-fns');
                const givenDateTime = new Date(dateStr);
                const ds = startOfDay(givenDateTime);
                const de = endOfDay(givenDateTime);
                const orders = yield this.findAll({
                    where: {
                        onTime: {
                            [Op.between]: [ds, de],
                        },
                    },
                });
                return orders;
            });
        }
        static withinInterval({ dateFrom, dateTo }) {
            return __awaiter(this, void 0, void 0, function* () {
                const Clock = sequelize.model('Clock');
                const ds = startOfDay(dateFrom);
                const de = endOfDay(dateTo);
                const orders = yield this.findAll({
                    where: {
                        onTime: {
                            [Op.between]: [ds, de],
                        },
                    },
                    include: [
                        {
                            model: Clock,
                            as: 'clock',
                        },
                    ],
                });
                return orders;
            });
        }
        static associate(models) {
            this.belongsTo(models.User, {
                as: 'user',
                foreignKey: { name: 'userId' },
            });
            this.belongsTo(models.Master, {
                as: 'master',
                foreignKey: { name: 'masterId' },
            });
            this.belongsTo(models.Clock, {
                as: 'clock',
                foreignKey: { name: 'clockId' },
            });
        }
    }
    Order.init({
        clockId: DataTypes.INTEGER,
        masterId: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        comment: DataTypes.STRING,
        onTime: DataTypes.DATE,
        deletedAt: DataTypes.DATE,
        price: DataTypes.DECIMAL,
        calendarEventId: DataTypes.STRING,
        thumbnailUrl: DataTypes.STRING,
        photoPublicId: DataTypes.STRING,
        payedSum: DataTypes.DECIMAL,
    }, {
        sequelize,
        modelName: 'Order',
        paranoid: true,
        validate: {
            isMasterFree() {
                return __awaiter(this, void 0, void 0, function* () {
                    yield orderValidators.checkMasterIsFree(sequelize, this);
                });
            },
        },
        hooks: {
            beforeUpdate: (order) => {
                order.deleteFromGoogleCalendar();
            },
            afterUpdate: (order) => {
                order.putToGoogleCalendar();
                order.checkForPhotoCleanup(order);
            },
            afterDestroy: (order) => {
                order.deleteFromGoogleCalendar();
                order.deleteFromCloudinary();
            },
            afterCreate: (order) => {
                order.putToGoogleCalendar();
            },
        },
    });
    return Order;
};
//# sourceMappingURL=order.js.map