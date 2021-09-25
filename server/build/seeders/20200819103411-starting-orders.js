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
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('Orders', [
            {
                id: 1,
                comment: 'Initial order1',
                userId: 1,
                onTime: '2020-08-20T13:00:00.000Z',
                clockId: 1,
                masterId: 1,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 2,
                comment: 'Initial order2',
                userId: 1,
                onTime: '2020-08-20T15:00:00.000Z',
                clockId: 1,
                masterId: 2,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        ], {});
        yield queryInterface.sequelize.query(`ALTER SEQUENCE "Orders_id_seq" RESTART WITH 100`);
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('Orders', { id: [1, 2] }, {});
    })
};
//# sourceMappingURL=20200819103411-starting-orders.js.map