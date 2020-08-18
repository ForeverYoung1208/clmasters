class PreordersController{

  post(preorderData){
    const data=preorderData

    //eeeemmm //cool logic here )))))

    
    
    
    
    
    
    
    
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