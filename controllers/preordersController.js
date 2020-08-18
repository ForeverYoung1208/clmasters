class PreordersController{

  post(preorderData){
    const data='mock'
    return ({
      status: 200, 
      json: {
        message:'got preorder data',
        data
      }  
    })  
  }
}

exports.preordersController = new PreordersController();