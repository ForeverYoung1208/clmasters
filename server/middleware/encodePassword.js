require('dotenv').config()
const bcrypt = require('bcryptjs')

const SALTROUNDS =  process.env.SECUR_SALTROUNDS

const encodePassword = async (req, res, next) => {
  
  if (req.body.password) {
    const passwordPalain = req.body.password
    req.body.password = await bcrypt.hash(passwordPalain, SALTROUNDS)
  }
  next()
  
}

exports.encodePassword = encodePassword
