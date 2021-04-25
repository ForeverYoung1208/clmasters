const { User } = require('../models')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const TokenStorage = require('../shared/tokenStorage')
const { noTimestamps } = require('../shared/services')
const { OAuth2Client } = require('google-auth-library')

require('dotenv').config()

const _tokenStorage = new TokenStorage()
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const JWTSECRET = process.env.SECUR_JWTSECRET
const JWTSECRET_REFRESH = process.env.SECUR_JWTSECRET_REFRESH
const USER_DEFAULT_PASSWORD = 'verySecretNoPassword_%d!@%&$*&34tg%'

class AuthController {
  constructor(tokenStorage) {
    this.tokenStorage = tokenStorage
  }

  async loginUser(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty())
      return res.status(401).json({ errors: errors.array() })

    try {
      const { email, password } = req.body
      const user = await User.authenticate(email, password)
      if (user.error)
        return res.status(401).json({ message: 'Wrong credentials.' })

      const accessToken = this.generateAccessToken(user.email)
      const refreshToken = this.generateRefreshToken(user.email)

      // eslint-disable-next-line no-unused-vars
      const { password: wipedPassword, ...userDataNoPassword } = user.dataValues
      res
        .status(200)
        .json({ user: { ...userDataNoPassword, accessToken, refreshToken } })
    } catch (e) {
      res
        .status(401)
        .json({
          message:
            'Something wrong at AuthController/loginUser (server error), ' +
            e.message,
        })
    }
  }

  async loginByGoogleToken(req, res) {
    const { tokenId } = req.body
    const client = new OAuth2Client(CLIENT_ID)
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: CLIENT_ID,
    })
    const { email, name } = ticket.getPayload()
    if (!email) return res.status(400).json({ message: 'No email given by google auth' })

    let user = await User.getByEmail(email)
    // if no such a user in our database - create new user from google auth data
    if (!user.email) {
      user = await User.create({ name, email, isAdmin: false })
    }

    // eslint-disable-next-line no-unused-vars
    const { password: wipedPassword, ...userDataNoPassword } = user.dataValues
    const accessToken = this.generateAccessToken(email)
    const refreshToken = this.generateRefreshToken(email)
    
    res
      .status(200)
      .json({ user: { ...userDataNoPassword, accessToken, refreshToken } })
  }

  async refreshTokens(req, res) {
    const refreshTokenGiven = req.body.refreshToken
    if (!refreshTokenGiven || !this.tokenStorage.find(refreshTokenGiven)) {
      return res.status(401).json({ message: 'Refresh token not found' })
    }

    this.tokenStorage.delete(refreshTokenGiven)

    jwt.verify(refreshTokenGiven, JWTSECRET_REFRESH, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Bad refresh token' })
      const newAccessToken = this.generateAccessToken(
        decoded.userEmail
      )
      const newRefreshToken = this.generateRefreshToken(
        decoded.userEmail
      )
      res.status(201).json({ newAccessToken, newRefreshToken })
    })
  }

  async byEmailFromToken(req, res) {
    const email = req.userEmail // injected by middleware while token check
    if (!email)
      return res
        .status(403)
        .json({ message: 'no email - maybe, bad access token' })
    const user = await User.getByEmail(email)
    const { password: pwd, ...userDataNoPassword } = user.dataValues
    return res
      .status(200)
      .json({ user: { ...noTimestamps(userDataNoPassword) } })
  }

  generateRefreshToken(userEmail) {
    const refreshToken = jwt.sign({ userEmail }, JWTSECRET_REFRESH)
    this.tokenStorage.push(refreshToken)
    return refreshToken
  }

  generateAccessToken(userEmail) {
    const accessToken = jwt.sign({ userEmail }, JWTSECRET, { expiresIn: '30d' })
    return accessToken
  }

  loginUserValidators() {
    return [
      check('email', 'Email is invalid').isEmail(),
      check('password', 'Must be longer than 3 chars!').isLength({ min: 3 }),
    ]
  }
}

exports.authController = new AuthController(_tokenStorage)
