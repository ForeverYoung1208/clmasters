import { Router } from 'express'

import preordersController from '../controllers/preordersController.js'

const router = Router()

router.post(
  '/',
  preordersController.postValidators(),
  async (req, res) => await preordersController.post(req, res)
)

export default router
