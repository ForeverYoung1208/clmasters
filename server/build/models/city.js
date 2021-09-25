"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const PaginatedModel_1 = require("./PaginatedModel/PaginatedModel");
module.exports = (sequelize) => {
    class City extends PaginatedModel_1.PaginatedModel {
        static associate(models) {
        }
    }
    City.init({
        name: sequelize_1.DataTypes.STRING,
        comment: sequelize_1.DataTypes.STRING,
        isActive: sequelize_1.DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'City',
        paranoid: true,
    });
    return City;
};
//# sourceMappingURL=city.js.map