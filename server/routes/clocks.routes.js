import { Router } from 'express'
import clocksController from '../controllers/clocksController.js'

const router = Router()

router.get(
  '/',
  async (req, res) => clocksController.getAll(req, res)
)

export default router