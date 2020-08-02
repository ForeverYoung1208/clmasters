const { Router } = require('express');
const { check, validationResult } = require('express-validator');

const { User } = require('../models/index');
const { authController } = require('../controllers/authController');

const router = Router()

// const jwt = require('jsonwebtoken');
// const config = require('config');
// const JWTSECRET = config.get('jwtSecret')

//  ------------  /api/auth/...  -------------

router.post(
  '/register',
  [
    check('email', 'Must be an email!').isEmail(),
    check('name', 'Must be longer than 3 chars!').isLength({ min:3 })
  ],
  async(req, res)=>{
  // try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({message: 'Validation failed!', errors})

    const {name, email, password} = req.body
    const {status, json} =  await authController().registerUser({name, email, password})
    return res.status(status).json(json)
  // } catch (e){
  //   res.status(500).json({message: 'Wrong auth/register'})
  // }
})

router.post('/login',
  [
    check('email', 'Must be an email!').isEmail(),
    check('password', 'Must be longer than 3 chars!').isLength({ min:3 })
  ], 
  async(req, res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ message: 'Validation failed!', errors })
    try{
      const {email, password} = req.body
      const {status, json} =  await authController().loginUser({email, password})
      return res.status(status).json(json)
    } catch (e){
      res.status(500).json({message: 'Wrong auth/login: [server error:]'+ e.message})
    }
  }
)


router.get('/users', async(req, res)=>{
  const users = await User.findAll();
  res.status(200).json(users)
})


module.exports = router