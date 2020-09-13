const { User } = require('../models/index')

const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const TokenStorage = require('../shared/tokenStorage')
const _tokenStorage = new TokenStorage()

const JWTSECRET = process.env.SECUR_JWTSECRET
const JWTSECRET_REFRESH = process.env.SECUR_JWTSECRET_REFRESH


class AuthController{
  constructor(tokenStorage) { 
    this.tokenStorage = tokenStorage
  }

  async loginUser(req, res) {
    const errors = validationResult(req)  // Finds the validation errors in this request and wraps them in an object with handy functions
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  
    try {
      const {email, password} = req.body
      const user = await User.authenticate(email, password)
      if (user.error) return (
        res.status(403).json({ message: 'Not authenticated, wrong credentials!' })    // `${user.error})!` - to specify exact auth problem
      )
      
      const accessToken = AuthController.generateAccessToken(user.email)
      
      const refreshToken = jwt.sign(
        { userEmail: user.email },
        JWTSECRET_REFRESH
      )

      this.tokenStorage.push(refreshToken)

      const {password:pwd, ...userDataNoPassword } = user.dataValues
      res.status(200).json({ user: { ...userDataNoPassword, accessToken, refreshToken} })
    } catch (e){
      res.status(500).json({message: 'Something wrong at auth/login (server error), '+ e.message})
    }
  }

  async issueAccessToken(req, res) { 
    const refreshToken = req.body.refreshToken
    if (!refreshToken || !this.tokenStorage.find(refreshToken)) return res.status(403).json({message: 'bad refresh token'})
    jwt.verify(refreshToken, JWTSECRET_REFRESH, (err, decoded) => {
      if (err) return res.sendStatus(403)
      const newAccessToken =  AuthController.generateAccessToken({userEmail: decoded.userEmail })
      res.status(201).json({ newAccessToken })

    })
    
  }

  static generateAccessToken(userEmail) {
    const accessToken = jwt.sign(
      { userEmail },
      JWTSECRET,
      {expiresIn: '5m'}
    ) 
    return accessToken
  }

  loginUserValidators() {
    return [
      check('email', 'Email must be an email!').isEmail(),
      check('password', 'Password must be longer than 3 chars!').isLength({ min: 3 })
    ]
  }

}


exports.authController = new AuthController(_tokenStorage)
