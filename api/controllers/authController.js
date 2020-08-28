const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWTSECRET = process.env.SECUR_JWTSECRET


const authController = () => {
    
  async function loginUser({email, password}){
    const user = await User.authenticate(email, password)
    if (user.error) return (
      {
        status:400, 
        json:{ message: `Not authenticated, wrong credentials!` }  // (${user.error})!` }
      }
    )

    const token = jwt.sign(
      { userEmail: user.email },
      JWTSECRET,
      {expiresIn: '1h'}
    ) 
    return ({
      status:200, 
      json:{user:{...user.dataValues, token, password:'hidden'}}
    })
  };

  async function registerUser({name, email}){
    newUser = await User.register(name, email)
    
    if(newUser && !newUser.error){
        return({
          status: 201,
          json:{message: 'User created', user:{ id: newUser.id, email: newUser.email}}
        })
      } else {
        return({
          status: 400,
          json:{message: `User NOT created: ${newUser.error ? newUser.error: 'something wrong'}` }
        })
      }
  }


  //============//

  return ({loginUser, registerUser})
};

exports.authController = authController(); //singleton!