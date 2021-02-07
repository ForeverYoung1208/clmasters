const checkMasterIsFree = async (sequelize, order) => {
  const { masterId, onTime, clockId } = order.dataValues

  const Master = sequelize.model('Master')
  const master = await Master.findByPk(masterId)
  const cityId = master.cityId

  const freeMasters = await Master.freeMastersForOrder(
    {
      cityId,
      orderDateTime: onTime,
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

module.exports = { checkMasterIsFree }
