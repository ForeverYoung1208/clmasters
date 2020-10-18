const jwt = require('jsonwebtoken')
const JWTSECRET = process.env.SECUR_JWTSECRET

const accessTokenToEmail = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.sendStatus(403)

  jwt.verify(token, JWTSECRET,
    
    (err, decoded) => { 
      if (err === 'TokenExpiredError') return res.sendStatus(401)
      if (err) return res.status(403).json({ error: err })
      req.userEmail = decoded.userEmail
      next()
    }
  )
  
}

exports.accessTokenToEmail = accessTokenToEmail
