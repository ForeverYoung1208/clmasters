const { User, Order, Master, Clock  } = require('../models/index');
class PreordersController{

  async post(data){
    const {preorderData} = data
    const {cityId:CityId, orderDateTime:orderDateTimeStr, repairTime:repairTimeStr} = preorderData

//--------
    // samples of usage
    // const user = await User.findOne({where: {email}, include:Order})
    // const user2 = await User.findByPk(2, {include:Order})
    
    // const [user, reqClock, reqCity] = await Promise.all([ 
    //   User.findOne({where: {email}}),
    //   Clock.findByPk(clockTypeId),
    // ])
    // const needTime = reqClock.repairTime
    // console.log('[user]', user)
    // console.log('[needTime]', needTime)

//---------
    // const [mastersInCity] = await Promise.all([ 
    //   Master.findAll({where: {CityId:cityId}, include:Order}),
    // ])
    // let freeTime = await mastersInCity[0].freeTimeAfter(orderDateTime)
//--------

    const freeMasters = await Master.freeMastersAfter({CityId, orderDateTimeStr, repairTimeStr})
    
    return ({
      status: 200, 
      json: {
        message:'free Msters found',
        freeMasters
      }  
    })  
  }
}

exports.preordersController = new PreordersController();