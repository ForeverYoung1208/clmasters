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
    
    return (
      {
        status:200, 
        json:{user:{id: user.id, name:user.name, email:user.email, isAdmin:user.isAdmin, token}}
      }
    )
  };

  //============//

  return ({loginUser})
};

exports.authController = authController;