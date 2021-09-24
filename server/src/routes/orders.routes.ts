import { Request, Response, Router } from 'express'
const { ordersController } = require('../controllers/ordersController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')
const { checkEmailIsAdmin } = require('../middleware/checkEmailIsAdmin')


const router = Router()

router.get(
  '/',
  async (req: Request, res: Response) => ordersController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  ordersController.putValidators(),
  async (req: Request, res: Response) => ordersController.put(req, res)
)

router.post(
  '/',
  ordersController.postValidators(),
  async (req: Request, res: Response) => ordersController.post(req, res)
)

router.delete(
  '/:id', accessTokenToEmail,
  accessTokenToEmail,
  checkEmailIsAdmin,
  async (req: Request, res: Response) => ordersController.delete(req, res)
)

module.exports = router
