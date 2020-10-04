'use strict'
const {
  Model,
  Op
} = require('sequelize')
const { timestrToMSec } = require('../shared/services')
module.exports = (sequelize, DataTypes) => {
  class Master extends Model {

    static async freeMastersForOrder(preorderData) {
      const { cityId, orderDateTime: orderDateTimeStr, clockTypeId } = preorderData
      

      const Clock = sequelize.model('Clock')
      const Order = sequelize.model('Order')

      const [clockType, maxRepairTimeMsec, mastersInCity] = await Promise.all([
        Clock.findByPk(clockTypeId),
        Clock.maxRepairTimeMsec(),
        this.findAll({
          where: {
            cityId
          }
        })
      ])

      const orderDateTimeStarts = new Date(orderDateTimeStr)
      const orderDateTimeEnds = new Date(
        orderDateTimeStarts.valueOf() + timestrToMSec(clockType.dataValues.repairTime)
      )

      const nearestOrders = await Order.withinInterval(
        {
          dateFrom: orderDateTimeStarts,
          dateTo: new Date(orderDateTimeStarts.valueOf() + maxRepairTimeMsec)
        }
      )


      const busyMasters = nearestOrders.reduce((acc, order) => {
        
        const { dataValues: existingOrder, Clock: { dataValues: existingClock } } = order
        const existingOrderEnds = new Date(
          existingOrder.onTime.valueOf() + timestrToMSec(existingClock.repairTime)
        )

        !!TODO!!!

        if (
          (existingOrderEnds < orderDateTimeStarts)
          || (existingOrder.onTime > orderDateTimeEnds)
        ) { 

          console.log('[existingOrder.masterId]', existingOrder.masterId)

          return acc.push(existingOrder.masterId)
        }
      },[])

      console.log('[busyMasters]', busyMasters)



    }


    static associate(models) {
      this.belongsTo(models.City, {
        foreignKey: { name: 'cityId'}
      })
      this.hasMany(models.Order, {
        foreignKey: { name: 'masterId'}
      })
      // define association here
    }
  }
  Master.init({
    name: DataTypes.STRING,
    cityId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Master',
    paranoid: true,
  })
  return Master
}