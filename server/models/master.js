'use strict'
const { timestrToMSec } = require('../shared/services')
const {
  Model,
  QueryTypes,
  Op
} = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Master extends Model {

    static async freeMastersAfter({cityId, orderDateTimeStr, repairTimeStr}){
      const orderDateTime = new Date(orderDateTimeStr)
      const orderDateTimeISOStr = orderDateTime.toISOString()
      const orderDateTimeEnds = new Date(orderDateTime.valueOf() + timestrToMSec(repairTimeStr))
      const orderDateTimeEndsISOStr = orderDateTimeEnds.toISOString()

      // the idea of further SQL is
      // to select masters from the given city whithout orders that interfere with requestet time.
      // so, inner subrequry makes sql to define ids of orders that don't inrterfere with given time, i.e.
      // order which  starts after the given time, or order which ends before the given time or order without
      // cpecified time are concidered to not interfere with giver time.
      // other orders are concidered to interfere, so they provide ids to outer sql to select masters with these 
      // 'interfering' orders.

      const busyMasters = await sequelize.query(
        `select 
          m.id
        from "Masters" m 
        left join "Cities" c on c."id"=m."cityId" 
        right join "Orders" o on o."masterId"=m."id"
        where 
          "cityId" = :cityId
          and o.id not in(
            select o2.id from "Orders" o2 
            where 
            o2."onTime" + o2."allocatedTime" < :orderDateTimeISOStr
            or o2."onTime" > :orderDateTimeEndsISOStr
            or o2."onTime" is null          
          )
        `,        
        {
          replacements: {
            cityId,
            orderDateTimeISOStr,
            orderDateTimeEndsISOStr
          },
          type: QueryTypes.SELECT,
          plain: false,
          raw:true
        }
      )
      const busyMastersIds = busyMasters.map(m => m.id)

      const freeMasters = await Master.findAll({
        where: {
          cityId,
          id:{
            [Op.notIn]:busyMastersIds
          }
        },
      })

      return freeMasters
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
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Master',
    paranoid: true,
  })
  return Master
}