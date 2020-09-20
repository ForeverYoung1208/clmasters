'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: {name: 'userId'}
      })
      this.belongsTo(models.Master, {
        foreignKey: {name: 'masterId'}
      })
      this.belongsTo(models.Clock, {
        foreignKey: {name: 'clockId'}
      })
      
    }
  }
  Order.init({
    clockId: DataTypes.INTEGER,
    masterId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    onTime: DataTypes.DATE,
    allocatedTime: DataTypes.TIME, //?
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
    paranoid: true,
  })
  return Order
}