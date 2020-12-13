'use strict'
import sequelize from 'sequelize'

const { Model } = sequelize

const model = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // City.orders = City.hasMany(models.Order)      
      // define association here
    }
  }
  City.init({
    name: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'City',
    paranoid: true
  })
  return City
}

export default model