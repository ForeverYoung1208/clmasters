const { Router } = require('express');

const { preordersController } = require('../controllers/preordersController');

const router = Router()

// POST preorder
router.post(
  '/',
  async(req, res)=>{
  try{
    const {status, json} = await preordersController.post(req.body)
    return res.status(status).json(json)
  } catch (e){
    res.status(500).json({message: 'Error in POST preorder/ [server error:]'+ e.message})
  }
})

module.exports = router