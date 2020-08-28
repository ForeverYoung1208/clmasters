const services = {
  timestrToMSec: function(str){

    const mSec = str.split(':').reduce((acc,val,idx)=>{
      switch (idx) {
        case 0:
          return (acc+parseInt(val)*60*60*1000)
        case 1:
          return (acc+parseInt(val)*60*1000)
        case 2:
          return (acc+parseInt(val)*1000)
        default:
          throw(new Error({message:'wrong format of time'}))
          break;
      }

    },0)
    return mSec
  }
}

module.exports = services