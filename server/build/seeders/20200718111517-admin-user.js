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
require('dotenv').config();
const bcrypt = require('bcryptjs');
const SALTROUNDS = parseInt(process.env.SECUR_SALTROUNDS);
module.exports = {
    up: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkInsert('Users', [
            {
                id: 1,
                name: 'Ihor',
                email: 'siafin2010@gmail.com',
                password: yield bcrypt.hash('123456', SALTROUNDS),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isAdmin: true
            },
            {
                id: 2,
                name: 'admin',
                email: 'admin@example.com',
                password: yield bcrypt.hash('passwordsecret', SALTROUNDS),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                isAdmin: true
            }
        ], {});
        yield queryInterface.sequelize.query('ALTER SEQUENCE "Users_id_seq" RESTART WITH 100');
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete('Users', { email: ['siafin2010@gmail.com', 'admin@example.com'] }, {});
    })
};
//# sourceMappingURL=20200718111517-admin-user.js.map