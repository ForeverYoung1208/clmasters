'use strict'
const {
  Model, Op
} = require('sequelize')
const { startOfDay, endOfDay} = require('date-fns')

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {

    
    static async getAtDate(dateStr) { 
      const { startOfDay, endOfDay } = require('date-fns')
      const givenDateTime = new Date(dateStr)
      const ds = startOfDay(givenDateTime)
      const de = endOfDay(givenDateTime)
      const orders = await this.findAll({
        where: {
          onTime: {
            [Op.between]: [ds, de]
          }
        }
      })
      return orders
    }

    static async withinInterval({ dateFrom, dateTo }) {
      
      const Clock = sequelize.model('Clock')

      const ds = startOfDay(dateFrom)
      const de = endOfDay(dateTo)

      const orders = await this.findAll({
        where: {
          onTime: {
            [Op.between]: [ds, de]
          }
        },
        include: [{
          model: Clock
        }]
      })

      return orders
    }



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
    // allocatedTime: DataTypes.TIME, //?
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Order',
    paranoid: true,
  })
  return Order
}