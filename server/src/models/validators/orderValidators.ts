import { Sequelize } from "sequelize/types"
import { IMasterAttr, TMasterCtor } from "typings/models/master"

const checkMasterIsFree = async (sequelize: Sequelize, order) => {
  const { masterId, onTime, clockId } = order.dataValues

  const Master = sequelize.model('Master') as TMasterCtor<IMasterAttr>
  const master = await Master.findByPk(masterId)
  const cityId = master?.cityId

  const freeMasters = await Master.freeMastersForOrder(
    {
      cityId,
      orderDateTimeStr: onTime,
      clockTypeId: clockId,
    },
    order.id
  )
  
  const isGivenMasterFree = freeMasters.some((m) => {
    return +m.dataValues.id === +masterId
  })

  if (!isGivenMasterFree)
    return Promise.reject(new Error('The master is busy at given time'))
}

export default checkMasterIsFree
// module.exports = { checkMasterIsFree }
