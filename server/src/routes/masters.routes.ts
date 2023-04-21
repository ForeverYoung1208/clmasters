import { Request, Response, Router } from 'express'
import { mastersController } from '../controllers/mastersController'
import { accessTokenToEmail } from '../middleware/accessTokenToEmail'
import { checkEmailIsAdmin } from '../middleware/checkEmailIsAdmin'

const router = Router()

router.get(
  '/',
  async (req: Request, res: Response) => mastersController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  mastersController.putValidators(),
  async (req: Request, res: Response) => mastersController.put(req, res)
)

router.post(
  '/',
  accessTokenToEmail,
  checkEmailIsAdmin,
  mastersController.postValidators(),
  async (req: Request, res: Response) => mastersController.post(req, res)
)

router.delete(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  async (req: Request, res: Response) => mastersController.delete(req, res)
)

module.exports = router
