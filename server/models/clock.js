'use strict'
const {
  Model
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Clock extends Model {
    
    static async maxRepairTimeMsec() {
      const { timestrToMSec } = require('../shared/services')
      const maxRepairTimeClock = await this.findOne({
        attributes: [
          [sequelize.fn('MAX', sequelize.col('repairTime')), 'maxTime']
        ],        
      })
      return timestrToMSec(maxRepairTimeClock.dataValues.maxTime)
    }
  
    
    static associate(models) {
      this.hasMany(models.Order, {
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