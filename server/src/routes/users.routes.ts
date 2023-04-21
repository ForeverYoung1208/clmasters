import { Request, Response, Router } from 'express'

import { usersController } from '../controllers/usersController'
import { accessTokenToEmail } from '../middleware/accessTokenToEmail'
import { checkEmailIsAdmin } from '../middleware/checkEmailIsAdmin'
import { encodePassword } from '../middleware/encodePassword'

const router = Router()

router.get(
  '/',
  async (req: Request, res: Response) => usersController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  usersController.putValidators(),
  encodePassword, // middleware to encode plain password to hashed one
  async (req: Request, res: Response) => usersController.put(req, res)
)

router.post(
  '/',
  accessTokenToEmail,
  checkEmailIsAdmin,
  usersController.postValidators(),
  encodePassword, // middleware to encode plain password to hashed one
  async (req: Request, res: Response) => usersController.post(req, res)
)

router.delete('/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  async (req: Request, res: Response) => usersController.delete(req, res)
)

module.exports = router
