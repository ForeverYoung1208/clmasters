const { User } = require('../models')

const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

require('dotenv').config()

const TokenStorage = require('../shared/tokenStorage')
const { noTimestamps } = require('../shared/services')
const _tokenStorage = new TokenStorage()

const JWTSECRET = process.env.SECUR_JWTSECRET
const JWTSECRET_REFRESH = process.env.SECUR_JWTSECRET_REFRESH


class AuthController{
  constructor(tokenStorage) { 
    this.tokenStorage = tokenStorage
  }

  async loginUser(req, res) {
    const errors = validationResult(req)  
    if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() })
  
    try {
      const { email, password } = req.body
      const user = await User.authenticate(email, password)
      if (user.error) return (
        res.status(403).json({ message: 'Not authenticated, wrong credentials!' })
      )
      
      const accessToken = AuthController.generateAccessToken(user.email)
      const refreshToken = AuthController.generateRefreshToken(user.email)

      this.tokenStorage.push(refreshToken)

      // eslint-disable-next-line no-unused-vars
      const {password:pwd, ...userDataNoPassword } = user.dataValues
      res.status(200).json({ user: { ...userDataNoPassword, accessToken, refreshToken} })
    } catch (e){
      res.status(500).json({message: 'Something wrong at AuthController/loginUser (server error), '+ e.message})
    }
  }


  async refreshTokens(req, res) { 
    const refreshTokenGiven = req.body.refreshToken
    if (!refreshTokenGiven || !this.tokenStorage.find(refreshTokenGiven)) {
      return res.status(403).json({ message: 'refresh token not found' })
    }

    this.tokenStorage.delete(refreshTokenGiven)

    jwt.verify(refreshTokenGiven, JWTSECRET_REFRESH, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'bad refresh token' })
      const newAccessToken = AuthController.generateAccessToken(
        decoded.userEmail
      )
      const newRefreshToken = AuthController.generateRefreshToken(
        decoded.userEmail
      )
      this.tokenStorage.push(newRefreshToken)
      res.status(201).json({ newAccessToken, newRefreshToken })
    })
  }

  async byEmailFromToken(req, res) {
    const email = req.userEmail    // injected by middleware while token check
    if (!email) return res.status(403).json({ message: 'no email - maybe, bad access token' })
    const user = await User.getByEmail(email)
    const {password:pwd, ...userDataNoPassword } = user.dataValues
    return res.status(200).json({ user: { ...noTimestamps(userDataNoPassword) } })
  }

  
  static generateRefreshToken(userEmail) {
    const refreshToken = jwt.sign(
      { userEmail },
      JWTSECRET_REFRESH
    )
    return refreshToken
  }

  static generateAccessToken(userEmail) {
    
    const accessToken = jwt.sign(
      { userEmail },
      JWTSECRET,
      // {expiresIn: '20s'}
      {expiresIn: '50m'}
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
