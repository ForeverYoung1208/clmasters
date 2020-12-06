const bcrypt = require('bcryptjs')
require('dotenv').config()
const SALTROUNDS =  process.env.SECUR_SALTROUNDS=3

const encodePassword = async (req, res, next) => {
  
  console.log('[=======req.body.password]========> ', req.body.password)
  if (req.body.password) {
    const passwordPalain = req.body.password
    req.body.password = await bcrypt.hash(passwordPalain, SALTROUNDS)
  }
  next()
  
}

exports.encodePassword = encodePassword
