import { DataTypes, Sequelize } from 'sequelize'
import { TPreorder } from 'typings/preorder'
import { PaginatedModel } from './PaginatedModel/PaginatedModel'
import { IMasterAttr } from 'typings/models/master'
import { TClockCtor, TClock } from 'typings/models/clock'
import { TOrder, TOrderCtor } from 'typings/models/order'

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

      const Clock = sequelize.model('Clock') as TClockCtor
      
      const Order = sequelize.model('Order') as TOrderCtor

      const [clockType, maxRepairTimeMsec, mastersInCity] = await Promise.all([
        Clock.findByPk(clockTypeId) as Promise<TClock>,
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
          timestrToMSec(clockType?.repairTime)
      )

      const nearestOrders = await Order.withinInterval({
        dateFrom: orderDateTimeStarts,
        dateTo: new Date(orderDateTimeStarts.valueOf() + maxRepairTimeMsec),
      })

      const busyMasters = nearestOrders.reduce((acc:Array<number>, order) => {
        // make exclusion if needed - this oder doesn't make the master busy
        if (+order.id === +excludeOrderId) return acc

        const {
          dataValues: existingOrder,
          clock: { dataValues: existingClock } = {dataValues:undefined},
          // clock: existingClock, 
        } = order
        const existingOrderEnds = new Date(
          existingOrder?.onTime.valueOf() +
            timestrToMSec(existingClock?.repairTime)
        )

        if (
          existingOrder &&
          roundToMinute(orderDateTimeStarts) <
            roundToMinute(existingOrderEnds) &&
          roundToMinute(orderDateTimeEnds) > roundToMinute(existingOrder.onTime)
        ) {
          acc.push(+existingOrder.masterId)
        }

        return acc
      }, [])

      const freeMastersInCity = mastersInCity.filter(
        // ({ dataValues: masterInCity }) =>
        ( masterInCity ) =>
          !busyMasters.includes(+masterInCity.id)
      )
      return freeMastersInCity
    }

    static associate(models:any) {
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
      id: { primaryKey: true, type: DataTypes.NUMBER },
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