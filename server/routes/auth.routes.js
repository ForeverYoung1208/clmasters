const { Router } = require('express')
const authController = require('../controllers/authController')

const router = Router()

router.post('/login', authController.loginUserValidators, authController.loginUser)
router.post('/register', authController.registerUserValidators, authController.registerUser)


module.exports = router