const {Router} = require('express');
const router = Router()

const { User } = require('../models/index')

// /api/auth/...

router.post('/register',async(req, res)=>{
  try{
    const {email, password} = req.body
    console.log(`in data email: ${email} password:${password}`);
    //.. work with User model will be here

  } catch (e){
    res.status(500).json({message: 'Something wrong in auth/register'})
  }

})

router.post('/login',async(req, res)=>{

})

router.get('/users',async(req, res)=>{
  console.log(`/users`);
  console.log( User );
  

  const users = await User.findAll();
  console.log(users.every(user => user instanceof User)); // true
  console.log("All users:", JSON.stringify(users, null, 2));

})



 

module.exports = router