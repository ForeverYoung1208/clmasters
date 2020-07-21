const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const config = require('config');
const { User } = require('../models/index');
// const user = require('../models/user');

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
  console.log('[------------------req.body]', req.body);
  const {email, password} = req.body
  try{
    const {isAuthenticated, user, message} = await User.authenticate(email, password)
    if(!isAuthenticated) return res.status(400).json({ message: `Not authenticated (${message})!` })
    const token = jwt.sign(
      { userEmail: user.email },
      JWTSECRET,
      {expiresIn: '1h'}
    ) 
    return res.status(200).json({token, user:{id: user.id, name:user.name, email:user.email}})
  } catch (e){
    res.status(500).json({message: 'Something wrong in auth/login: [server error:]'+ e.message})
  }
})


router.get('/users', async(req, res)=>{
  const users = await User.findAll();
  res.status(200).json(users)
})


module.exports = router