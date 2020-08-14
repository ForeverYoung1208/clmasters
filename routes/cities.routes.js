const { Router } = require('express');

// const { check, validationResult } = require('express-validator');
// const { City } = require('../models/index');

const { citiesController } = require('../controllers/citiesController');

const router = Router()
// create
router.post(
  '/create',
  async(req, res)=>{
  try{
    //...
  } catch (e){
    //...
  }
})

// read
router.get(
  '/:id',
  async(req, res)=>{
  try{
    const cityId = req.params.id
    const {status, json} = await citiesController().getCity(cityId)
    res.status(status).json(json)

  } catch (e){
    res.status(500).json({message: 'Error in GET city/:id [server error:]'+ e.message})
  }
})

//update
router.put(
  '/:id',
  async(req, res)=>{
  try{
    //...
  } catch (e){
    //...
  }
})

//delete
router.delete(
  '/:id',
  async(req, res)=>{
  try{
    //...
  } catch (e){
    //...
  }
})


module.exports = router