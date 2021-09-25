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
        yield queryInterface.bulkInsert('Clocks', [
            {
                id: 1,
                type: 'Small',
                repairTime: '1:00',
                comment: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 2,
                type: 'Medium',
                repairTime: '2:00',
                comment: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
            {
                id: 3,
                type: 'Big',
                repairTime: '3:00',
                comment: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        ], {});
        yield queryInterface.sequelize.query('ALTER SEQUENCE "Clocks_id_seq" RESTART WITH 100');
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('Clocks', { type: ['Small', 'Medium', 'Big'] }, {});
    })
};
//# sourceMappingURL=20200817185329-clocks.js.map