const { Router } = require('express')

const { citiesController } = require('../controllers/citiesController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')
const { checkEmailIsAdmin } = require('../middleware/checkEmailIsAdmin')

const router = Router()

router.get(
  '/',
  async (req, res) => citiesController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  citiesController.putValidators(),
  async (req, res) => citiesController.put(req, res)
)

router.post(
  '/',
  accessTokenToEmail,
  checkEmailIsAdmin,
  citiesController.postValidators(),
  async (req, res) => citiesController.post(req, res)
)

router.delete(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  async (req, res) => citiesController.delete(req, res)
)

module.exports = router