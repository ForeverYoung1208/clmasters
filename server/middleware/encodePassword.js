import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

dotenv.config()

const SALTROUNDS =  parseInt(process.env.SECUR_SALTROUNDS)


const encodePassword = async (req, res, next) => {
  
  if (req.body.password) {
    const passwordPalain = req.body.password
    req.body.password = await bcrypt.hash(passwordPalain, SALTROUNDS)
  }
  next()
  
}

export default encodePassword
