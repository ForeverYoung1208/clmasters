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
        yield queryInterface.addColumn('Masters', 'hourRate', {
            type: Sequelize.DataTypes.DECIMAL(14, 2),
            unique: false,
            allowNull: false,
            defaultValue: '0'
        });
        yield queryInterface.addColumn('Orders', 'price', {
            type: Sequelize.DataTypes.DECIMAL(14, 2),
            unique: false,
            allowNull: true,
        });
        yield queryInterface.addColumn('Masters', 'isActive', {
            type: Sequelize.DataTypes.BOOLEAN,
            unique: false,
            allowNull: false,
            defaultValue: 'true',
        });
        yield queryInterface.addColumn('Cities', 'isActive', {
            type: Sequelize.DataTypes.BOOLEAN,
            unique: false,
            allowNull: false,
            defaultValue: 'true',
        });
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.removeColumn('Masters', 'hourRate');
        yield queryInterface.removeColumn('Orders', 'price');
        yield queryInterface.removeColumn('Masters', 'isActive');
        yield queryInterface.removeColumn('Cities', 'isActive');
    }),
};
//# sourceMappingURL=20210318191503-addPriceAndActiveness.js.map