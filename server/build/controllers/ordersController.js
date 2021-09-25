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
const { check, validationResult } = require('express-validator');
const { Order, User, Master, Clock, City } = require('../models');
const { CRUDController } = require('./common/CRUDController');
const { noTimestamps, timeStrToWords } = require('../shared/services');
const { notInPast } = require('./validators/customValidators');
const sendEmail = require('../shared/mailjet');
const { utcToZonedTime, format } = require('date-fns-tz');
const { addMonths } = require('date-fns');
const { Op } = require('sequelize');
const timeZone = 'Europe/Kiev';
const ONE_HOUR_MSEC = new Date('1970-01-01T01:00:00Z');
class OrdersController extends CRUDController {
    constructor(model) {
        super(model);
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page, pageSize, email: emailQuery, monthStr: monthQuery } = req.query;
            if (page && !pageSize) {
                res.status(400).json({
                    errors: [
                        {
                            param: 'orders',
                            msg: 'pageSize must be specified!',
                        },
                    ],
                });
            }
            if (pageSize && !page) {
                return res.status(400).json({
                    errors: [
                        {
                            param: 'orders',
                            msg: 'page must be specified!',
                        },
                    ],
                });
            }
            let whereOptions = { where: [] };
            if (emailQuery) {
                whereOptions.where.push({ '$user.email$': emailQuery });
            }
            if (monthQuery) {
                const monthStart = new Date(monthQuery);
                const monthEnd = addMonths(new Date(monthQuery), 1);
                whereOptions.where.push({
                    onTime: {
                        [Op.between]: [monthStart, monthEnd]
                    }
                });
            }
            const { count: totalCount, page: currentPage, rows, } = yield Order.findAllPaginated(Object.assign(Object.assign({}, whereOptions), { include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Master,
                        as: 'master',
                        include: [
                            {
                                model: City,
                                as: 'city',
                            },
                        ],
                    },
                    {
                        model: Clock,
                        as: 'clock',
                    },
                ], order: [
                    ['id', 'ASC'],
                ] }), {
                page,
                pageSize,
            });
            const data = rows.map((o) => {
                const _a = noTimestamps(o.dataValues), { user: wipedUser, master: wipedMaster, clock: wipedClock, calendarEventId: wipedCalendarEventId } = _a, order = __rest(_a, ["user", "master", "clock", "calendarEventId"]);
                order.userName = o.user.name;
                order.userEmail = o.user.email;
                order.masterName = o.master.name;
                order.clockType = o.clock.type;
                order.repairTime = o.clock.repairTime;
                order.masterCity = o.master.city.name;
                return order;
            });
            return res.status(200).json({ totalCount, currentPage, data });
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            const _a = req.body, { price: wipedPrice } = _a, data = __rest(_a, ["price"]);
            const { clockId, masterId } = data;
            const masterFromRequest = yield Master.findByPk(masterId);
            const clockFromRequest = yield Clock.findByPk(clockId);
            data.price =
                Math.round((masterFromRequest.hourRate / ONE_HOUR_MSEC) *
                    new Date(`1970-01-01T${clockFromRequest.repairTime}Z`) *
                    100) / 100;
            let user;
            if (data.userId) {
                user = yield User.findByPk(data.userId);
            }
            else {
                ;
                [user] = yield User.findOrCreate({
                    where: { email: data.email },
                    defaults: { name: data.name },
                });
                user.name = data.name;
                user.save();
                data.userId = user.id;
            }
            try {
                var createResult = yield Order.create(data);
            }
            catch (error) {
                return res.status(400).json({
                    errors: [
                        {
                            param: 'order',
                            msg: error.message,
                        },
                    ],
                });
            }
            const newOrders = yield Order.findAll({
                where: { id: createResult.dataValues.id },
                include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Master,
                        as: 'master',
                        include: [
                            {
                                model: City,
                                as: 'city',
                            },
                        ],
                    },
                    {
                        model: Clock,
                        as: 'clock',
                    },
                ],
                order: [
                    ['id', 'ASC'],
                ],
            });
            const { master, clock } = newOrders[0];
            const ukrTime = utcToZonedTime(newOrders[0].onTime, timeZone);
            const ukrTimeStr = format(ukrTime, 'dd.MM.yyyy HH:mm', {
                timeZone: timeZone,
            });
            const emailResult = yield sendEmail({
                toEmail: user.email,
                HTMLPart: `
        <h2>Order information</h2>
        <div>Order ID: ${newOrders[0].id}
        <div>User Name: ${user.name}</div>
        <div>User Email: ${user.email}</div>
        <div>City: ${master.city.name}</div>
        <div>On Time: ${ukrTimeStr}</div>
        <div>
          Clock Type: ${clock.type}, 
          repair time: ${timeStrToWords(clock.repairTime)}
          </div>
        <div>Master: ${master.name}</div>
        `,
            });
            const _b = Object.assign(Object.assign({}, noTimestamps(newOrders[0].dataValues)), { userName: user.name, userEmail: user.email, masterName: master.name, masterCity: master.city.name, clockType: clock.type, repairTime: clock.repairTime, isEmailSent: emailResult.response.ok }), { user: wipedUser, master: wipedMaster, clock: wipedClock, calendarEventId: wipedCalendarEventId } = _b, orderToSend = __rest(_b, ["user", "master", "clock", "calendarEventId"]);
            return res.status(201).json(orderToSend);
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = validationResult(req);
            if (!errors.isEmpty())
                return res.status(422).json({ errors: errors.array() });
            const _a = req.body, { id: wipedId, price: wipedPrice } = _a, data = __rest(_a, ["id", "price"]);
            const id = req.params.id;
            const { masterId, clockId } = data;
            const masterFromRequest = yield Master.findByPk(masterId);
            const clockFromRequest = yield Clock.findByPk(clockId);
            data.price =
                Math.round((masterFromRequest.hourRate / ONE_HOUR_MSEC) *
                    new Date(`1970-01-01T${clockFromRequest.repairTime}Z`) *
                    100) / 100;
            let orderToUpdate = yield this.model.findByPk(id);
            if (!orderToUpdate)
                return res.status(400).json({
                    message: `Model with id:${id} not found`,
                });
            Object.assign(orderToUpdate, data);
            try {
                var updateResult = yield orderToUpdate.save();
            }
            catch ({ errors }) {
                return res.status(400).json({ errors });
            }
            if (!updateResult) {
                return res.stats(500).json({
                    message: 'CDUD controller error: model not updated',
                });
            }
            const updatedOrders = yield Order.findAll({
                where: { id: updateResult.dataValues.id },
                include: [
                    {
                        model: User,
                        as: 'user',
                    },
                    {
                        model: Master,
                        as: 'master',
                        include: [
                            {
                                model: City,
                                as: 'city',
                            },
                        ],
                    },
                    {
                        model: Clock,
                        as: 'clock',
                    },
                ],
                order: [
                    ['id', 'ASC'],
                ],
            });
            const { master, clock, user } = updatedOrders[0];
            const _b = Object.assign(Object.assign({}, noTimestamps(updatedOrders[0].dataValues)), { userName: user.name, userEmail: user.email, masterName: master.name, masterCity: master.city.name, repairTime: clock.repairTime, clockType: clock.type }), { user: wipedUser, master: wipedMaster, clock: wipedClock, calendarEventId: wipedCalendarEventId } = _b, orderToSend = __rest(_b, ["user", "master", "clock", "calendarEventId"]);
            return res.status(200).json(orderToSend);
        });
    }
    putValidators() {
        return [
            check('onTime', 'onTime must exist!')
                .exists()
                .notEmpty()
                .custom(notInPast),
            check('clockId', 'clockId must exist!').exists().notEmpty(),
            check('masterId', 'masterId must exist!').exists().notEmpty(),
        ];
    }
    postValidators() {
        return [
            check('onTime', 'onTime must exist!')
                .exists()
                .notEmpty()
                .custom(notInPast),
            check('clockId', 'clockId must exist!').exists().notEmpty(),
            check('masterId', 'masterId must exist!').exists().notEmpty(),
        ];
    }
}
exports.ordersController = new OrdersController(Order);
//# sourceMappingURL=ordersController.js.map