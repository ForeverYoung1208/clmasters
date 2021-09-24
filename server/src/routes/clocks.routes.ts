import { Request, Response, Router } from 'express'

import { clocksController } from '../controllers/clocksController'

const router = Router()

router.get(
  '/',
  async (req: Request, res: Response) => clocksController.getAll(req, res)
)

module.exports = router
