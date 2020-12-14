'use strict'
const { Model, Op } = require('sequelize')
const { startOfDay, endOfDay } = require('date-fns')
const orderValidators = require('./validators/orderValidators')

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
            [Op.between]: [ds, de],
          },
        },
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
            [Op.between]: [ds, de],
          },
        },
        include: [
          {
            model: Clock,
            as: 'clock',
          },
        ],
      })

      return orders
    }

    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        as: 'user',
        foreignKey: { name: 'userId' },
      })
      this.belongsTo(models.Master, {
        as: 'master',
        foreignKey: { name: 'masterId' },
      })
      this.belongsTo(models.Clock, {
        as: 'clock',
        foreignKey: { name: 'clockId' },
      })
    }
  }

  Order.init(
    {
      clockId: DataTypes.INTEGER,
      masterId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      onTime: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'Order',
      paranoid: true,
      validate: {
        async isMasterFree() {
          await orderValidators.checkMasterIsFree(sequelize, this)
        },
      },
    }
  )

  // example of defining hooks. Great thing, for future knowledge.
  // Order.addHook('beforeCreate', 'checkMasterBeforeCreate', order => orderValidators.checkMasterIsFree(sequelize,order))
  // Order.addHook('beforeUpdate', 'checkMasterBeforeUpdate', order => orderValidators.checkMasterIsFree(sequelize,order))

  return Order
}
