const { Router } = require('express')

const { citiesController } = require('../controllers/citiesController')

const router = Router()

router.get('/', async (req, res) => citiesController.getAll(req, res))

router.put('/:id', citiesController.putValidators(), async (req, res) => citiesController.put(req, res))
router.post('/', citiesController.postValidators(), async (req, res) => citiesController.post(req, res))
router.delete('/:id', async (req, res) => citiesController.delete(req, res))

module.exports = router