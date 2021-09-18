const { User } = require('../models')

const checkEmailIsAdmin = async (req, res, next) => {
  const { userEmail } = req
  if (!userEmail)
    return res.status(401).json({ error: 'no email provided' })
  const user = await User.getByEmail(userEmail)
  if (!user.isAdmin)
    return res.status(401).json({ error: 'not authorized' })
  next()
}

exports.checkEmailIsAdmin = checkEmailIsAdmin
