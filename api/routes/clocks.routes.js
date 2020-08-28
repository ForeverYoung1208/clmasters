const { Router } = require('express');

const { clocksController } = require('../controllers/clocksController');

const router = Router()

// read all
router.get(
  '/',
  async(req, res)=>{
  try{
    const {status, json} = await clocksController.getAll()
    return res.status(status).json(json)
  } catch (e){
    res.status(500).json({message: 'Error in GET All clocks/ [server error:]'+ e.message})
  }
})

module.exports = router