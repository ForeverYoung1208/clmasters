const { User } = require('../models/index')

const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const { tokenStorage } = require('../shared/tokenStorage')

const JWTSECRET = process.env.SECUR_JWTSECRET
const JWTSECRET_REFRESH = process.env.SECUR_JWTSECRET_REFRESH


class AuthController{

  async loginUser(req, res) {
    const errors = validationResult(req)  // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  
    try {
      const {email, password} = req.body
      const user = await User.authenticate(email, password)
      if (user.error) return (
        res.status(400).json({ message: 'Not authenticated, wrong credentials!' })    // `${user.error})!` - to specify exact auth problem
      )
      
      const accessToken = jwt.sign(
        { userEmail: user.email },
        JWTSECRET,
        {expiresIn: '5m'}
      ) 
      
      const refreshToken = jwt.sign(
        { userEmail: user.email },
        JWTSECRET_REFRESH
      )

      tokenStorage.push(refreshToken)

      const {password:pwd, ...userDataNoPassword } = user.dataValues
      res.status(200).json({ user: { ...userDataNoPassword, accessToken} })
    } catch (e){
      res.status(500).json({message: 'Something wrong at auth/login (server error), '+ e.message})
    }
  }

  loginUserValidators() {
    return [
      check('email', 'Email must be an email!').isEmail(),
      check('password', 'Password must be longer than 3 chars!').isLength({ min: 3 })
    ]
  }

}


exports.authController = new AuthController()





// const JWTSECRET = process.env.SECUR_JWTSECRET
// const JWTSECRET_REFRESH = process.env.SECUR_JWTSECRET_REFRESH


// exports.loginUser = async function (req, res) {
//   const errors = validationResult(req)  // Finds the validation errors in this request and wraps them in an object with handy functions
//   if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

//   try {
//     const {email, password} = req.body
//     const user = await User.authenticate(email, password)
//     if (user.error) return (
//       res.status(400).json({ message: 'Not authenticated, wrong credentials!' })    // `${user.error})!` - to specify exact auth problem
//     )
//     const accessToken = jwt.sign(
//       { userEmail: user.email },
//       JWTSECRET,
//       {expiresIn: '1h'}
//     ) 
//     const {password:pwd, ...userDataNoPassword } = user.dataValues
//     res.status(200).json({ user: { ...userDataNoPassword, accessToken} })
//   } catch (e){
//     res.status(500).json({message: 'Something wrong at auth/login (server error), '+ e.message})
//   }
// }
// exports.loginUserValidators = exports.registerUserValidators = function () {
//   return [
//     check('email', 'Email must be an email!').isEmail(),
//     check('password', 'Password must be longer than 3 chars!').isLength({ min: 3 })
//   ]
// }


// exports.getAccessToken = async function (req, res) {
//   //...
//   res.status(500).json({ message: 'Not implemented yet' })   
// }






// exports.registerUser = async function (req, res) {
//   const errors = validationResult(req)
//   if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })

//   try {
//     const {name, email} = req.body                   // const {name, email, password} = req.bodyi dont know how to manage password in registration yet. Maybe, in future...
//     const newUser = await User.register(name, email)
//     if (newUser && !newUser.error) {
//       return res.status(201).json({ user: { id: newUser.id, email: newUser.email } })
//     } else {
//       return res.status(400).json({message: 'error with registerng user:'+ JSON.stringify(newUser.error) })
//     }
        
//   } catch (e){
//     res.status(500).json({message: 'Something wrong at auth/register (server error), '+ e.message})
//   }
// }
 


// exports.registerUserValidators = function () { 
//   return [  
//     check('email', 'Must be an email!').isEmail(),
//     check('name', 'Name must be longer than 2 chars!').isLength({ min:2 })    
//   ]
// }