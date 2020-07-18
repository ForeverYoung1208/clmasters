const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const config = require('config');
const { User } = require('../models/index');
const user = require('../models/user');

const router = Router()
const JWTSECRET = config.get('jwtSecret')

// /api/auth/...

router.post(
  '/register',
  [
    check('email', 'Must be an email!').isEmail(),
    check('name', 'Must be longer than 3 chars!').isLength({ min:3 })
  ],
  async(req, res)=>{
  try{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed!',
        errors
      })
    }

    const {name, email, password} = req.body
    newUser = await User.register(name, email, password)

    if(newUser){
      res.status(201).json({message: 'User created', user:{ id: newUser.id, email: newUser.email}})
    } else {
      res.status(400).json({message: 'User NOT created - maybe, email is already taken', newUser })
    }

  } catch (e){
    res.status(500).json({message: 'Something wrong in auth/register'})
  }

})

router.post('/login', async(req, res)=>{
  try{
    user = await User.authenticate(email, password)
    if(!user) return res.status(400).json({ message: 'not authenticated!' })

    const token = jwt.sign(
      { userEmail: user.email },
      JWTSECRET,
      {expiresIn: '1h'}
    )     

    res.status(200).json({token, user:{id: user.id, email:user.email}})



  } catch (e){
    res.status(500).json({message: 'Something wrong in auth/login'})
  }
})


router.get('/users',async(req, res)=>{
  const users = await User.findAll();

  // const users = await User.findAll({
  //   where:{ email: 'siafin2010@gmail.com' }
  // });
  res.status(200).json(users)
})



 

module.exports = router