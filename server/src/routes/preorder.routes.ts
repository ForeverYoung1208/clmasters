import { Request, Response, Router } from 'express'

const { preordersController } = require('../controllers/preordersController')

const router = Router()

router.post(
  '/',
  preordersController.postValidators(),
  async (req: Request, res: Response) => await preordersController.post(req, res)
)

module.exports = router
