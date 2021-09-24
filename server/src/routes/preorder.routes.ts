import { Request, Response, Router } from 'express'
import { preordersController } from '../controllers/preordersController'

const router = Router()

router.post(
  '/',
  preordersController.postValidators(),
  async (req: Request, res: Response) => await preordersController.post(req, res)
)

module.exports = router
