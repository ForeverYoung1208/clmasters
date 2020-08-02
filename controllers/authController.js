const { User } = require('../models/index');
const jwt = require('jsonwebtoken');
const config = require('config');
const JWTSECRET = config.get('jwtSecret')


const authController = () => {
    
  async function loginUser({email, password}){
    const {isAuthenticated, user, message} = await User.authenticate(email, password)
    if(!isAuthenticated) return res.status(400).json({ message: `Not authenticated (${message})!` })
    const token = jwt.sign(
      { userEmail: user.email },
      JWTSECRET,
      {expiresIn: '1h'}
    ) 
    return ({
      status:200, 
      json:{user:{id: user.id, name:user.name, email:user.email, isAdmin:user.isAdmin, token}}
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

exports.authController = authController;