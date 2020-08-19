'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Master extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Master.city = Master.belongsTo(models.City)
      // define association here
    }
  };
  Master.init({
    name: DataTypes.STRING,
    CityId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Master',
    paranoid: true,
  });
  return Master;
};