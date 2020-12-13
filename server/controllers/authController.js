import models from '../models/index.js'

import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


import { noTimestamps } from '../shared/services.js'
import TokenStorage from '../shared/tokenStorage.js'

dotenv.config()

const { User } = models


const _tokenStorage = new TokenStorage()

const JWTSECRET = process.env.SECUR_JWTSECRET
const JWTSECRET_REFRESH = process.env.SECUR_JWTSECRET_REFRESH

class AuthController{
  constructor(tokenStorage) { 
    this.tokenStorage = tokenStorage
  }

  async loginUser(req, res) {
    const errors = validationResult(req)  
    if (!errors.isEmpty()) return res.status(401).json({ errors: errors.array() })
  
    try {
      const { email, password } = req.body
      const user = await User.authenticate(email, password)
      if (user.error) return (
        res.status(401).json({ message: 'Wrong credentials.' })
      )
      
      const accessToken = AuthController.generateAccessToken(user.email)
      const refreshToken = AuthController.generateRefreshToken(user.email)

      this.tokenStorage.push(refreshToken)

      // eslint-disable-next-line no-unused-vars
      const {password:pwd, ...userDataNoPassword } = user.dataValues
      res.status(200).json({ user: { ...userDataNoPassword, accessToken, refreshToken} })
    } catch (e){
      res.status(401).json({message: 'Something wrong at AuthController/loginUser (server error), '+ e.message})
    }
  }


  async refreshTokens(req, res) { 
    const refreshTokenGiven = req.body.refreshToken
    if (!refreshTokenGiven || !this.tokenStorage.find(refreshTokenGiven)) {
      return res.status(401).json({ message: 'Refresh token not found' })
    }

    this.tokenStorage.delete(refreshTokenGiven)

    jwt.verify(refreshTokenGiven, JWTSECRET_REFRESH, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Bad refresh token' })
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
      {expiresIn: '30d'}
    ) 
    return accessToken
  }

  loginUserValidators() {
    return [
      check('email', 'Email is invalid').isEmail(),
      check('password', 'Must be longer than 3 chars!').isLength({ min: 3 })
    ]
  }

}


export default new AuthController(_tokenStorage)
