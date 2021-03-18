'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  City.init(
    {
      name: DataTypes.STRING,
      comment: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'City',
      paranoid: true,
    }
  )
  return City
}
