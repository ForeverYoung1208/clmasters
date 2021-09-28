import { DataTypes, Model, ModelCtor, Sequelize } from 'sequelize'
import { TPreorder } from 'typings/preorder'
import { PaginatedModel } from './PaginatedModel/PaginatedModel'
import { IMasterAttr } from 'typings/models/master'
import { TClockCtor, IClockAttr } from 'typings/models/clock'

const { timestrToMSec } = require('../shared/services')
const roundToMinute = require('date-fns/roundToNearestMinutes')


module.exports = (sequelize: Sequelize) => {
  class Master extends PaginatedModel<IMasterAttr> implements IMasterAttr {
    id!: number
    cityId!: number
    rating!: number
    hourRate!: number
    name!: string
    comment: string = ''
    isActive: boolean = true
    createdAt?: Date | undefined
    updatedAt?: Date | undefined
    // excludeOrderId - to be able save order being eddited.
    // otherwise, we'll get error that master is busy
    static async freeMastersForOrder(preorderData: TPreorder, excludeOrderId:number) {
      const { cityId, orderDateTimeStr, clockTypeId } = preorderData

      // const Clock: ModelCtor<ClockStatic<IClockAttr>> & { maxRepairTimeMsec?: () => void } = sequelize.model('Clock')
      const Clock: TClockCtor<IClockAttr> = sequelize.model('Clock')
      
      const Order = sequelize.model('Order')

      const [clockType, maxRepairTimeMsec, mastersInCity] = await Promise.all([
        Clock.findByPk(clockTypeId),
        Clock.maxRepairTimeMsec!(),
        this.findAll({
          where: {
            cityId,
          },
        }),
      ])

      const orderDateTimeStarts = new Date(orderDateTimeStr)
      const orderDateTimeEnds = new Date(
        orderDateTimeStarts.valueOf() +
          timestrToMSec(clockType.dataValues.repairTime)
      )

      const nearestOrders = await Order.withinInterval({
        dateFrom: orderDateTimeStarts,
        dateTo: new Date(orderDateTimeStarts.valueOf() + maxRepairTimeMsec),
      })

      const busyMasters = nearestOrders.reduce((acc, order) => {
        // make exclusion if needed - this oder doesn't make the master busy
        if (+order.id === +excludeOrderId) return acc

        const {
          dataValues: existingOrder,
          clock: { dataValues: existingClock },
        } = order
        const existingOrderEnds = new Date(
          existingOrder.onTime.valueOf() +
            timestrToMSec(existingClock.repairTime)
        )

        if (
          roundToMinute(orderDateTimeStarts) <
            roundToMinute(existingOrderEnds) &&
          roundToMinute(orderDateTimeEnds) > roundToMinute(existingOrder.onTime)
        ) {
          acc.push(+existingOrder.masterId)
        }

        return acc
      }, [])

      const freeMastersInCity = mastersInCity.filter(
        ({ dataValues: masterInCity }) =>
          !busyMasters.includes(+masterInCity.id)
      )
      return freeMastersInCity
    }

    static associate(models) {
      this.belongsTo(models.City, {
        as: 'city',
        foreignKey: { name: 'cityId' },
      })
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: { name: 'masterId' },
      })
    }
  }
  Master.init(
    {
      name: DataTypes.STRING,
      cityId: DataTypes.INTEGER,
      comment: DataTypes.STRING,
      deletedAt: DataTypes.DATE,
      rating: DataTypes.INTEGER,
      hourRate: DataTypes.DECIMAL,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Master',
      paranoid: true,
    }
  )
  return Master
}
