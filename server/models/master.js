'use strict'
import sequelize from 'sequelize'
import dateFns from 'date-fns'
import { timestrToMSec } from '../shared/services.js'

const {roundToNearestMinutes} = dateFns
const { Model } = sequelize

const model = (sequelize, DataTypes) => {
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
        
        const { dataValues: existingOrder, clock: { dataValues: existingClock } } = order
        const existingOrderEnds = new Date(
          existingOrder.onTime.valueOf() + timestrToMSec(existingClock.repairTime)
        )

        if (
          (roundToNearestMinutes(orderDateTimeStarts) < roundToNearestMinutes(existingOrderEnds))
          && (roundToNearestMinutes(orderDateTimeEnds) > roundToNearestMinutes(existingOrder.onTime))
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
        as: 'city',
        foreignKey: { name: 'cityId'}
      })
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: { name: 'masterId'}
      })
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

export default model