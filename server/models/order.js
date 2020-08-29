'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Order.clock = Order.belongsTo(models.Clock)
      // Order.master = Order.belongsTo(models.Master)
      // Order.user = Order.belongsTo(models.User)
      this.belongsTo(models.User)

      // define association here
    }
  };
  Order.init({
    ClockId: DataTypes.INTEGER,
    MasterId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    onTime: DataTypes.DATE,
    allocatedTime: DataTypes.TIME, //?
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
    paranoid: true,
  });
  return Order;
};