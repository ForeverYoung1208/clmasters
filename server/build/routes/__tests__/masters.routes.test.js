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
const faker = require('faker');
const { User, City, Master } = require('../../models');
const supertest = require('supertest');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const request = supertest(app);
const SALTROUNDS = parseInt(process.env.SECUR_SALTROUNDS);
const JWTSECRET = process.env.SECUR_JWTSECRET;
const userAdmin = {
    name: 'adminUser',
    email: 'siafin2010@gmail.com',
    passwordRaw: '123456',
    isAdmin: true,
};
userAdmin.password = bcrypt.hashSync(userAdmin.passwordRaw, SALTROUNDS);
userAdmin.validAccessToken = jwt.sign({ userEmail: userAdmin.email }, JWTSECRET, { expiresIn: '30d' });
const userPlain = {
    name: 'plainUser',
    email: 'siafin1111@gmail.com',
    passwordRaw: '1234567',
    isAdmin: false,
};
userPlain.password = bcrypt.hashSync(userPlain.passwordRaw, SALTROUNDS);
userPlain.validAccessToken = jwt.sign({ userEmail: userPlain.email }, JWTSECRET, { expiresIn: '30d' });
const cityData = {
    name: faker.random.words(1),
    comment: faker.random.words(5),
    isActive: true,
};
const masterData = {
    name: faker.name.firstName(),
    cityId: 'need to assignt after city creation',
    comment: faker.random.words(5),
    deletedAt: null,
    rating: faker.datatype.number(5),
    hourRate: '9.46',
    isActive: true,
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield User.truncate({ cascade: true, force: true });
    yield Master.truncate({ cascade: true, force: true });
    yield City.truncate({ cascade: true, force: true });
    yield City.create(cityData);
    yield User.create(userAdmin);
    yield User.create(userPlain);
}));
describe('masters POST endpoint', () => {
    it('should fail when accessing with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/masters')
            .set('authorization', 'bearer INVALID-ACCESS-TOKEN')
            .expect(401);
        expect(response.body).toMatchObject({
            error: {
                message: 'jwt malformed',
                name: 'JsonWebTokenError',
            },
        });
    }));
    it('should fail when accessing with non-admin account', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .post('/api/masters')
            .set('authorization', `bearer ${userPlain.validAccessToken}`)
            .expect(401);
        expect(response.body).toMatchObject({
            error: 'not authorized',
        });
    }));
    it('should fail when got valid token and admin account but master\'s "name" not specified', () => __awaiter(void 0, void 0, void 0, function* () {
        const city = yield City.findOne();
        const noNameMaster = Object.assign(Object.assign({}, masterData), { cityId: city.id, name: null });
        const response = yield request
            .post('/api/masters')
            .send(noNameMaster)
            .set('authorization', `bearer ${userAdmin.validAccessToken}`)
            .expect(422);
        expect(response.body).toMatchObject({
            errors: [
                {
                    location: 'body',
                    msg: 'name must be not empty!',
                    param: 'name',
                    value: null,
                },
            ],
        });
    }));
    it('should fail when got valid token and admin account but "cityId" not specified', () => __awaiter(void 0, void 0, void 0, function* () {
        const noCityMaster = Object.assign(Object.assign({}, masterData), { cityId: null });
        const response = yield request
            .post('/api/masters')
            .send(noCityMaster)
            .set('authorization', `bearer ${userAdmin.validAccessToken}`)
            .expect(422);
        expect(response.body).toMatchObject({
            errors: [
                {
                    location: 'body',
                    msg: 'cityId must exist!',
                    param: 'cityId',
                    value: null,
                },
            ],
        });
    }));
    it('should create master when got valid token and admin account and valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        const city = yield City.findOne();
        const newMaster = Object.assign(Object.assign({}, masterData), { cityId: city.id });
        const response = yield request
            .post('/api/masters')
            .send(newMaster)
            .set('authorization', `bearer ${userAdmin.validAccessToken}`)
            .expect(201);
        expect(response.body).toMatchObject({
            'cityId': expect.any(Number),
            'cityName': cityData.name,
            'comment': masterData.comment,
            'deletedAt': null,
            'hourRate': expect.any(String),
            'id': expect.any(Number),
            'isActive': true,
            'name': masterData.name,
            'rating': masterData.rating,
        });
    }));
});
describe('masters PUT endpoint', () => {
    let oldMaster;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const city = yield City.findOne();
        oldMaster = yield Master.create(Object.assign(Object.assign({}, masterData), { cityId: city.id }));
    }));
    it('should fail when accessing with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .put(`/api/masters/${oldMaster.id}`)
            .set('authorization', 'bearer INVALID-ACCESS-TOKEN')
            .expect(401);
        expect(response.body).toMatchObject({
            error: {
                message: 'jwt malformed',
                name: 'JsonWebTokenError',
            },
        });
    }));
    it('should fail when accessing with non-admin account', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .put(`/api/masters/${oldMaster.id}`)
            .set('authorization', `bearer ${userPlain.validAccessToken}`)
            .expect(401);
        expect(response.body).toMatchObject({
            error: 'not authorized',
        });
    }));
    it('should fail when got valid token and admin account but master\'s "name" not specified', () => __awaiter(void 0, void 0, void 0, function* () {
        const city = yield City.findOne();
        const noNameMaster = Object.assign(Object.assign({}, masterData), { cityId: city.id, name: null });
        const response = yield request
            .put(`/api/masters/${oldMaster.id}`)
            .send(noNameMaster)
            .set('authorization', `bearer ${userAdmin.validAccessToken}`)
            .expect(422);
        expect(response.body).toMatchObject({
            errors: [
                {
                    location: 'body',
                    msg: 'name must be not empty!',
                    param: 'name',
                    value: null,
                },
            ],
        });
    }));
    it('should fail when got valid token and admin account but "cityId" not specified', () => __awaiter(void 0, void 0, void 0, function* () {
        const noCityMaster = Object.assign(Object.assign({}, masterData), { cityId: null });
        const response = yield request
            .put(`/api/masters/${oldMaster.id}`)
            .send(noCityMaster)
            .set('authorization', `bearer ${userAdmin.validAccessToken}`)
            .expect(422);
        expect(response.body).toMatchObject({
            errors: [
                {
                    location: 'body',
                    msg: 'cityId must exist!',
                    param: 'cityId',
                    value: null,
                },
            ],
        });
    }));
    it('should update master when got valid token and admin account and valid data', () => __awaiter(void 0, void 0, void 0, function* () {
        const city = yield City.findOne();
        const newNameMaster = Object.assign(Object.assign({}, masterData), { name: 'new Master name', cityId: city.id });
        const response = yield request
            .post('/api/masters')
            .send(newNameMaster)
            .set('authorization', `bearer ${userAdmin.validAccessToken}`)
            .expect(201);
        expect(response.body).toMatchObject({
            'cityId': expect.any(Number),
            'cityName': cityData.name,
            'comment': masterData.comment,
            'deletedAt': null,
            'hourRate': expect.any(String),
            'id': expect.any(Number),
            'isActive': true,
            'name': newNameMaster.name,
            'rating': masterData.rating,
        });
    }));
});
describe('masters DELETE endpoint', () => {
    let oldMaster;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const city = yield City.findOne();
        oldMaster = yield Master.create(Object.assign(Object.assign({}, masterData), { cityId: city.id }));
    }));
    it('should fail when accessing with invalid token', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete(`/api/masters/${oldMaster.id}`)
            .set('authorization', 'bearer INVALID-ACCESS-TOKEN')
            .expect(401);
        expect(response.body).toMatchObject({
            error: {
                message: 'jwt malformed',
                name: 'JsonWebTokenError',
            },
        });
    }));
    it('should fail when accessing with non-admin account', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .delete(`/api/masters/${oldMaster.id}`)
            .set('authorization', `bearer ${userPlain.validAccessToken}`)
            .expect(401);
        expect(response.body).toMatchObject({
            error: 'not authorized',
        });
    }));
    it('should delete master when got valid token and admin account', () => __awaiter(void 0, void 0, void 0, function* () {
        yield request
            .delete(`/api/masters/${oldMaster.id}`)
            .set('authorization', `bearer ${userAdmin.validAccessToken}`)
            .expect(204);
        const checkIsMasterDeleted = yield Master.findByPk(oldMaster.id);
        expect(checkIsMasterDeleted).toBe(null);
    }));
});
describe('masters GET endpoint', () => {
    let master1, master2;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield Master.truncate({ cascade: true, force: true });
        const city = yield City.findOne();
        master1 = yield Master.create(Object.assign(Object.assign({}, masterData), { cityId: city.id, name: faker.name.firstName() }));
        master2 = yield Master.create(Object.assign(Object.assign({}, masterData), { cityId: city.id, name: faker.name.firstName() }));
    }));
    it('should respond with masters array without pagination if no pagination params given', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/masters')
            .expect(200);
        expect(response.body).toMatchObject({
            'currentPage': null,
            data: [{
                    'cityId': expect.any(Number),
                    'cityName': cityData.name,
                    'comment': master1.comment,
                    'deletedAt': null,
                    'hourRate': expect.any(String),
                    'id': expect.any(Number),
                    'isActive': true,
                    'name': master1.name,
                    'rating': master1.rating,
                },
                {
                    'cityId': expect.any(Number),
                    'cityName': cityData.name,
                    'comment': master2.comment,
                    'deletedAt': null,
                    'hourRate': expect.any(String),
                    'id': expect.any(Number),
                    'isActive': true,
                    'name': master2.name,
                    'rating': master2.rating,
                },
            ]
        });
    }));
    it('should fail if page given but page size not given', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/masters?page=1')
            .expect(400);
        expect(response.body).toMatchObject({
            errors: [
                {
                    msg: 'pageSize must be specified!',
                    param: 'masters',
                },
            ],
        });
    }));
    it('should fail if page size given but page not given', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request
            .get('/api/masters?pageSize=3')
            .expect(400);
        expect(response.body).toMatchObject({
            errors: [
                {
                    msg: 'page must be specified!',
                    param: 'masters',
                },
            ],
        });
    }));
    it('should respond with paginated masters array if pagination params given', () => __awaiter(void 0, void 0, void 0, function* () {
        const city = yield City.findOne();
        const master3 = yield Master.create(Object.assign(Object.assign({}, masterData), { cityId: city.id, name: faker.name.firstName() }));
        const master4 = yield Master.create(Object.assign(Object.assign({}, masterData), { cityId: city.id, name: faker.name.firstName() }));
        const response = yield request
            .get('/api/masters?page=1&pageSize=3')
            .expect(200);
        expect(response.body).toMatchObject({
            'currentPage': 2,
            'totalCount': 4,
            data: [{
                    'cityId': expect.any(Number),
                    'cityName': cityData.name,
                    'comment': master1.comment,
                    'deletedAt': null,
                    'hourRate': expect.any(String),
                    'id': expect.any(Number),
                    'isActive': true,
                    'name': master1.name,
                    'rating': master1.rating,
                }]
        });
    }));
});
//# sourceMappingURL=masters.routes.test.js.map