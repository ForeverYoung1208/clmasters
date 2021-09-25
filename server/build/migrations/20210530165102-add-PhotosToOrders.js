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
        yield queryInterface.addColumn('Orders', 'thumbnailUrl', {
            type: Sequelize.DataTypes.STRING,
            unique: false,
            allowNull: true,
        });
        yield queryInterface.addColumn('Orders', 'photoPublicId', {
            type: Sequelize.DataTypes.STRING,
            unique: false,
            allowNull: true,
        });
    }),
    down: (queryInterface, Sequelize) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.removeColumn('Orders', 'thumbnailUrl');
        yield queryInterface.removeColumn('Orders', 'photoPublicId');
    }),
};
//# sourceMappingURL=20210530165102-add-PhotosToOrders.js.map