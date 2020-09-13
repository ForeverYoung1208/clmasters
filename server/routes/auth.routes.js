const { Router } = require('express')
const { authController } = require('../controllers/authController')

const router = Router()


router.post('/login', authController.loginUserValidators(), (req,res)=>authController.loginUser(req, res))
router.post('/token', (req, res) => authController.issueAccessToken(req, res))
// router.post('/register', authController.registerUserValidators(), authController.registerUser)


module.exports = router