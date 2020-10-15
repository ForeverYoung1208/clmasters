const { Router } = require('express')
const { authController } = require('../controllers/authController')

const router = Router()


router.post('/login', authController.loginUserValidators(), (req,res)=>authController.loginUser(req, res))
router.post('/refreshTokens', (req, res) => authController.refreshTokens(req, res))
// router.post('/register', authController.registerUserValidators(), authController.registerUser)


module.exports = router