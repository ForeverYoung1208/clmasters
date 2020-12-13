import { Router } from 'express'
import citiesController from '../controllers/citiesController.js'
import accessTokenToEmail from '../middleware/accessTokenToEmail.js'

const router = Router()

router.get(
  '/',
  async (req, res) => citiesController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  citiesController.putValidators(),
  async (req, res) => citiesController.put(req, res)
)

router.post(
  '/',
  accessTokenToEmail,
  citiesController.postValidators(),
  async (req, res) => citiesController.post(req, res)
)

router.delete(
  '/:id',
  accessTokenToEmail,
  async (req, res) => citiesController.delete(req, res)
)

export default router