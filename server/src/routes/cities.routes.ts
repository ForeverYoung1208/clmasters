import { Request, Response, Router } from 'express'
import { citiesController } from '../controllers/citiesController'
import { accessTokenToEmail } from '../middleware/accessTokenToEmail'
import { checkEmailIsAdmin } from '../middleware/checkEmailIsAdmin'

const router = Router()

router.get(
  '/',
  async (req: Request, res: Response) => citiesController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  citiesController.putValidators(),
  async (req: Request, res: Response) => citiesController.put(req, res)
)

router.post(
  '/',
  accessTokenToEmail,
  checkEmailIsAdmin,
  citiesController.postValidators(),
  async (req: Request, res: Response) => citiesController.post(req, res)
)

router.delete(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  async (req: Request, res: Response) => citiesController.delete(req, res)
)

module.exports = router