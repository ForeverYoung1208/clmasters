import { Request, Response, Router } from 'express'

const { citiesController } = require('../controllers/citiesController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')
const { checkEmailIsAdmin } = require('../middleware/checkEmailIsAdmin')

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