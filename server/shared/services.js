const MSEC_IN_HOUR = 3600000
const MSEC_IN_MINUTE = 60000
const MSEC_IN_SECOND = 1000

const services = {
  timestrToMSec: function(str){
    const mSec = str.split(':').reduce((acc,val,idx)=>{
      switch (idx) {
        case 0:
          return (acc+parseInt(val) * MSEC_IN_HOUR)
        case 1:
          return (acc+parseInt(val) * MSEC_IN_MINUTE)
        case 2:
          return (acc+parseInt(val) * SEC_IN_SECOND)
        default:
          throw(new Error({message:'wrong format of time'}))
          break;
      }
    },0)
    return mSec
  }
}

module.exports = services