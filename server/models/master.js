'use strict'
const {
  Model,
  Op
} = require('sequelize')
const { timestrToMSec } = require('../shared/services')
module.exports = (sequelize, DataTypes) => {
  class Master extends Model {

    static async freeMastersForOrder(preorderData) {
      const roundToMinute = require('date-fns/roundToNearestMinutes')
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

        if (
          (roundToMinute(orderDateTimeStarts) < roundToMinute(existingOrderEnds))
          && (roundToMinute(orderDateTimeEnds) > roundToMinute(existingOrder.onTime))
        ) { 
          acc.push( +existingOrder.masterId)
        }

        return acc
      },[])

      const freeMastersInCity = mastersInCity.filter(
        ({ dataValues: masterInCity }) => !busyMasters.includes(+masterInCity.id)
      )
      return freeMastersInCity
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
    deletedAt: DataTypes.DATE,
    rating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Master',
    paranoid: true,
  })
  return Master
}