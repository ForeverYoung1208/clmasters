'use strict'
import sequelize from 'sequelize'
import { timestrToMSec } from '../shared/services.js'

const { Model } = sequelize

const model = (sequelize, DataTypes) => {
  class Clock extends Model {
    
    static async maxRepairTimeMsec() {
      const maxRepairTimeClock = await this.findOne({
        attributes: [
          [sequelize.fn('MAX', sequelize.col('repairTime')), 'maxTime']
        ],        
      })
      return timestrToMSec(maxRepairTimeClock.dataValues.maxTime)
    }
  
    
    static associate(models) {
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: {name: 'clockId'}
      })      
    }
  }
  Clock.init({
    type: DataTypes.STRING,
    repairTime: DataTypes.TIME, //?
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Clock',
    paranoid: true
  })
  return Clock
}

export default model