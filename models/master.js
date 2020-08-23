'use strict';
const { timestrToMSec } = require('../shared/services');
const {
  Model,
  QueryTypes
} = require('sequelize');
const c = require('config');
module.exports = (sequelize, DataTypes) => {
  class Master extends Model {

    static async freeMastersAfter({CityId, orderDateTimeStr, repairTimeStr}){
      const orderDateTime = new Date(orderDateTimeStr)
      const orderDateTimeLocalStr = orderDateTime.toLocaleString()
      const orderDateTimeEnds = new Date(orderDateTime.valueOf() + timestrToMSec(repairTimeStr))
      const orderDateTimeEndsLocalStr = orderDateTimeEnds.toLocaleString()

      console.log('[orderDateTimeEnds]', orderDateTimeEnds) 

      // the idea of further SQL is
      // to select masters from the given city whithout orders that interfere with requestet time.
      // so, inner subrequry makes sql to define ids of orders that don't inrterfere with given time, i.e.
      // order which  starts after the given time, or order which ends before the given time or order without
      // cpecified time are concidered to not interfere with giver time.
      // other orders are concidered to interfere, so they provide ids to outer sql to select masters with these 
      // 'interfering' orders.
      // 
      // all the resulting data except MasterId is for debugging and testing purposes... but it costs not much cpu time, so
      // i'll leave it as is 
      
      const busyMasters = await sequelize.query(
        `select 
          m.name as mastername, 
          m.id as MasterId,
          o.id as OrderId,
          c.name as cityname,
          o.comment as ordercomment,
          o."onTime" as ordertime,
          o."onTime" + o."allocatedTime" as ordertimeends

        from "Masters" m 
        left join "Cities" c on c."id"=m."CityId" 
        right join "Orders" o on o."MasterId"=m."id"
        where 
          "CityId" = :CityId
          and o.id not in(
            select o2.id from "Orders" o2 
            where 
            o."onTime" + o."allocatedTime" < :orderDateTimeLocalStr
            or o."onTime" > :orderDateTimeEndsLocalStr
            or o."onTime" is null          
          )
        `,
        {
          replacements: {
            CityId,
            orderDateTimeLocalStr,
            orderDateTimeEndsLocalStr
          },
          type: QueryTypes.SELECT,
          plain: false,
          raw:true
        }
      )

      const freeMasters = Master.findAll({where: {id: email}})


      return freeMasters

    }



    async freeTimeAfter(dateTime){
      const _orders = await this.getOrders()
      const orders = _orders.map(({dataValues})=> {
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
        // further logic must be here.....
        // i've decided to try to optimize db requests using custom query in static method freeMastersAfter..
        // i.e. i'll try to put most of the logic into the sql query..
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