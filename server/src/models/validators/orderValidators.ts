import { Sequelize } from "sequelize/types"
import { TMaster, TMasterCtor } from "typings/models/master"
import { TOrder } from "typings/models/order"

const checkMasterIsFree = async (sequelize: Sequelize, order:TOrder) => {
  // const { masterId, onTime, clockId } = order.dataValues
  const { masterId, onTime, clockId } = order

  const Master = sequelize.model('Master') as TMasterCtor
  const master = await Master.findByPk(masterId) as TMaster
  const cityId = master?.cityId

  const freeMasters = await Master.freeMastersForOrder(
    {
      cityId,
      // orderDateTimeStr: onTime,
      orderDateTimeStr: onTime.toISOString(),
      clockTypeId: clockId,
    },
    order.id
  )
  
  const isGivenMasterFree = freeMasters.some((m) => {
    // return +m.dataValues.id === +masterId
    return +m.id === +masterId
  })

  if (!isGivenMasterFree)
    return Promise.reject(new Error('The master is busy at given time'))
}

export default { checkMasterIsFree }

// module.exports = { checkMasterIsFree }
