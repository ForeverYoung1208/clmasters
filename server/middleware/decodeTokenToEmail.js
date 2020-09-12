const jwt = require('jsonwebtoken')
const JWTSECRET = process.env.SECUR_JWTSECRET

const decodeTokenToEmail = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(403)

  jwt.verify(token, JWTSECRET,
    
    (err, decoded) => { 
      if (err) return res.sendStatus(403)
      req.userEmail = decoded.userEmail
      next()
    }
  )
  
}

exports.decodeTokenToEmail = decodeTokenToEmail
