import { Router } from 'express'
import ordersController from '../controllers/ordersController.js'
import accessTokenToEmail from '../middleware/accessTokenToEmail.js'


const router = Router()

router.get(
  '/query',
  async (req, res) => ordersController.getAllByParam(req, res)
)

router.get(
  '/',
  async (req, res) => ordersController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  ordersController.putValidators(),
  async (req, res) => ordersController.put(req, res)
)

router.post(
  '/',
  ordersController.postValidators(),
  async (req, res) => ordersController.post(req, res)
)

router.delete(
  '/:id', accessTokenToEmail,
  async (req, res) => ordersController.delete(req, res)
)

export default router
