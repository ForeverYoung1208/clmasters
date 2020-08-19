const { User, Order, Master, Clock  } = require('../models/index');
class PreordersController{

  async post(data){
    const {preorderData} = data
    const {email} = preorderData

    const user = await User.findOne({where: {email}, include:Order})

    // const userOrders = await user.getOrders()
    
    
    // console.log(user.name)
    // console.log(userOrders)


    // const order = await Order.findOne({where: {id:1}})

    // const user = await order.getUser()

    // console.log('[order.comment]', order.comment)
    console.log('[user]', user.Orders)

    

    //eeeemmm //cool logic here )))))



    
    
    
    
    
    
    
    
    return ({
      status: 200, 
      json: {
        message:'got preorder data',
        preorderData
      }  
    })  
  }
}

exports.preordersController = new PreordersController();