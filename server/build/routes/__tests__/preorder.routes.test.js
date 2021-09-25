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
const app = require('../../app');
const supertest = require('supertest');
var addHours = require('date-fns/addHours');
const request = supertest(app);
const faker = require('faker');
const { User, City, Master, Clock, Order } = require('../../models');
const cityData = {
    name: 'Blood covenant',
    isActive: true,
    comment: faker.random.words(4),
};
const clockData = {
    type: 'Small',
    repairTime: '01:00:00',
    comment: faker.random.words(4),
};
const userData = {
    name: faker.random.word(),
    email: faker.internet.email(),
    passwordRaw: '1234567',
    isAdmin: false,
};
const masterData = {
    mame: 'Slash',
    cityId: '--- assign later, when records created ---',
    rating: '4',
    comment: faker.random.words(4),
    hourRate: '1.5',
    isActive: true,
};
const orderData = {
    clockId: '--- assign later, when records created ---',
    masterId: '--- assign later, when records created ---',
    userId: '--- assign later, when records created ---',
    comment: faker.random.words(4),
    price: 3,
    payedSum: 2,
    onTime: '2021-09-08T22:00'
};
const preorderData = {
    cityId: '--- assign later, when records created ---',
    onTime: '2021-09-08T22:00',
    clockId: '--- assign later, when records created ---',
};
describe('preorder POST endpoint', () => {
    let city, clock, master, user, order;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield City.truncate({ cascade: true, force: true });
        yield Clock.truncate({ cascade: true, force: true });
        yield User.truncate({ cascade: true, force: true });
        yield Master.truncate({ cascade: true, force: true });
        yield Order.truncate({ cascade: true, force: true });
        city = yield City.create(cityData);
        clock = yield Clock.create(clockData);
        user = yield User.create(userData);
        master = yield Master.create(Object.assign(Object.assign({}, masterData), { cityId: city.id }));
        order = yield Order.create(Object.assign(Object.assign({}, orderData), { clockId: clock.id, masterId: master.id, userId: user.id }));
    }));
    it('should fail if cityId not cpecified', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/preorder')
            .send(Object.assign(Object.assign({}, preorderData), { cityId: null, clockId: clock.id }))
            .expect(422);
        expect(response.body).toMatchObject({
            errors: [
                {
                    location: 'body',
                    msg: 'cityId must be specified!',
                    param: 'cityId',
                    value: null,
                },
            ],
        });
    }));
    it('should fail if clockId not cpecified', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/preorder')
            .send(Object.assign(Object.assign({}, preorderData), { cityId: city.id, clockId: null }))
            .expect(422);
        expect(response.body).toMatchObject({
            errors: [
                {
                    location: 'body',
                    msg: 'clockId must be specified!',
                    param: 'clockId',
                    value: null,
                },
            ],
        });
    }));
    it('should fail if onTime in the past', () => __awaiter(void 0, void 0, void 0, function* () {
        const nowMinusHour = addHours(new Date(), -1);
        const response = yield request
            .post('/api/preorder')
            .send(Object.assign(Object.assign({}, preorderData), { onTime: nowMinusHour.toISOString(), cityId: city.id, clockId: clock.id }))
            .expect(422);
        expect(response.body).toMatchObject({
            errors: [
                {
                    location: 'body',
                    msg: 'Order date can\'t be in the past ',
                    param: 'onTime',
                    value: expect.any(String),
                },
            ],
        });
    }));
    it('should return empty array if there is no free master in the given city at given time', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/preorder')
            .send(Object.assign(Object.assign({}, preorderData), { onTime: orderData.onTime, cityId: city.id, clockId: clock.id }))
            .expect(200);
        expect(response.body).toEqual([]);
    }));
    it('should return free masters when request is correct and there are free masters', () => __awaiter(void 0, void 0, void 0, function* () {
        const timeAfterOrder = addHours(new Date(orderData.onTime), 3);
        const response = yield request
            .post('/api/preorder')
            .send(Object.assign(Object.assign({}, preorderData), { onTime: timeAfterOrder.toISOString(), cityId: city.id, clockId: clock.id }))
            .expect(200);
        expect(response.body.length).toEqual(1);
    }));
});
//# sourceMappingURL=preorder.routes.test.js.map