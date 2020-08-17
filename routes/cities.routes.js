const { Router } = require('express');

//TODO: Check and refactor DRY

// const { check, validationResult } = require('express-validator');

const { citiesController } = require('../controllers/citiesController');

const router = Router()
// create
router.post(
  '/create',
  async(req, res)=>{
  try{
    const {inName, inComment} = req.body
    const {status,json} = citiesController.createCity(inName, inComment)
    return res.status(status).json(json)
  } catch (e){
    res.status(500).json({message: 'Error in GET cities/:id [server error:]'+ e.message})
  }
})

// read one
router.get(
  '/:id',
  async(req, res)=>{
  try{
    const cityId = req.params.id
    const {status, json} = await citiesController.getCity(cityId)
    return res.status(status).json(json)
  } catch (e){
    res.status(500).json({message: 'Error in GET cities/:id [server error:]'+ e.message})
  }
})

// read all
router.get(
  '/',
  async(req, res)=>{
  try{
    const {status, json} = await citiesController.getAll()
    return res.status(status).json(json)
  } catch (e){
    res.status(500).json({message: 'Error in GET cities/ [server error:]'+ e.message})
  }
})

//update
router.put(
  '/:id',
  async(req, res)=>{
    try{
      const {id} = req.params.id
      const {inName, inComment} = req.body      
      const {status, json} = await citiesController.updateCity({id, inName, inComment})
      return res.status(status).json(json)
    } catch (e){
      res.status(500).json({message: 'Error in PUT cities/ [server error:]'+ e.message})
    }
})

//delete
router.delete(
  '/:id',
  async(req, res)=>{
    try{
      const {id} = req.params.id
      const {status, json} = await citiesController.deleteCity(id)
      return res.status(status).json(json)
    } catch (e){
      res.status(500).json({message: 'Error in DELETE cities/ [server error:]'+ e.message})
    }
})


module.exports = router