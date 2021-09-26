import { Sequelize, DataTypes, Optional } from 'sequelize'

import { PaginatedModel  } from './PaginatedModel/PaginatedModel'
import { timestrToMSec } from '../shared/services'
// import { MyModel } from 'typings/model'
// import { IClock } from 'typings/models/clock'

interface IClockAttr {
  id:number
  type: string
  repairTime: string
  comment: string
  createdAt?: Date
  updatedAt?: Date  
}
// interface ClockCreationAttr extends Optional<ClockAttr, "id"> { }

module.exports = (sequelize: Sequelize) => {
  class Clock extends PaginatedModel<IClockAttr> implements IClockAttr{
    id!: number
    type!: string
    repairTime!: string
    comment: string = ''
    createdAt?: Date | undefined
    updatedAt?: Date | undefined
    maxTime?: string
    
    static async maxRepairTimeMsec() {
      const maxRepairTimeClock = await this.findOne({
        attributes: [
          [Sequelize.fn('MAX', Sequelize.col('repairTime')), 'maxTime'],
        ],
      })
      return timestrToMSec(maxRepairTimeClock?.maxTime)
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
