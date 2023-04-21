import { Sequelize, DataTypes } from 'sequelize'

import { PaginatedModel  } from './PaginatedModel/PaginatedModel'
import { timestrToMSec } from '../shared/services'
import { IClockAttr } from 'typings/models/clock'

// type TClock = PaginatedModel<IClockAttr> & {
//   id: number
//   type: string
//   repairTime: string
//   comment: string
//   createdAt?: Date | undefined
//   updatedAt?: Date | undefined
//   maxTime?: string
// }

module.exports = (sequelize: Sequelize) => {
  class Clock extends PaginatedModel<IClockAttr> implements IClockAttr{
    id!: number
    type!: string
    repairTime!: string
    comment: string = ''
    createdAt?: Date | undefined
    updatedAt?: Date | undefined
    
    static async maxRepairTimeMsec() {
      const maxRepairTimeClock = await this.findOne({
        attributes: [
          [Sequelize.fn('MAX', Sequelize.col('repairTime')), 'maxTime'],
        ],
      }) as Clock & {maxTime: number}
      return timestrToMSec(maxRepairTimeClock.maxTime)
      // return timestrToMSec(maxRepairTimeClock.dataValues.maxTime)
    }

    static associate(models:any) {
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: { name: 'clockId' },
      })
    }
  }
  Clock.init(
    {
      id: { primaryKey: true, type: DataTypes.NUMBER },
      type: DataTypes.STRING,
      repairTime: DataTypes.TIME, //?
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Clock',
      paranoid: true,
    }
  )
  return Clock
}
