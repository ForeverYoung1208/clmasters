'use strict';
const { timestrToMSec } = require('../shared/services');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Master extends Model {

    async freeTimeAfter(dateTime){
      console.log('[dateTime]', dateTime)
      const _orders = await this.getOrders()
      const orders = _orders.map(({dataValues})=> {
        console.log('[dataValues]', dataValues)
        let allocatedTimeInMS = 0
        if (dataValues.allocatedTime){
          allocatedTimeInMS = timestrToMSec(dataValues.allocatedTime)
        }
        return({
          allocatedTime: allocatedTimeInMS,
          onTime: dataValues.onTime
        })
      })

        //////////////
        // TODO : further logic must be here.....
        /////////////



      

      return orders
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.City)
      this.hasMany(models.Order)
      // define association here
    }
  };
  Master.init({
    name: DataTypes.STRING,
    CityId: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Master',
    paranoid: true,
  });
  return Master;
};