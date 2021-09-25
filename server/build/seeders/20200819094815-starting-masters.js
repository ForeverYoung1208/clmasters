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
        yield queryInterface.bulkInsert('Masters', [
            {
                id: 1,
                name: 'Master 1',
                comment: 'Initial master1',
                cityId: 1,
                rating: 0,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 2,
                name: 'Master 2',
                comment: 'Initial master2',
                cityId: 1,
                rating: 2,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 3,
                name: 'Master 3',
                comment: 'Initial master3',
                cityId: 2,
                rating: 3,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 4,
                name: 'Master 4',
                comment: 'Initial master4',
                cityId: 2,
                rating: 4,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        ], {});
        yield queryInterface.sequelize.query('ALTER SEQUENCE "Masters_id_seq" RESTART WITH 100');
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('Masters', { id: [1, 2, 3, 4] }, {});
    })
};
//# sourceMappingURL=20200819094815-starting-masters.js.map