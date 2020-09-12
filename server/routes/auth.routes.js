const { Router } = require('express')
const { authController } = require('../controllers/authController')

const router = Router()


router.post('/login', authController.loginUserValidators(), authController.loginUser)
// router.get('/token', authController.getAcceesToken)
// router.post('/register', authController.registerUserValidators(), authController.registerUser)


module.exports = router