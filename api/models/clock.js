'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Clock.orders = Clock.hasMany(models.Order)
      // define association here
    }
  };
  Clock.init({
    type: DataTypes.STRING,
    repairTime: DataTypes.TIME, //?
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clock',
    paranoid: true
  });
  return Clock;
};