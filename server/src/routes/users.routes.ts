import { Request, Response, Router } from 'express'
const { usersController } = require('../controllers/usersController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')
const { checkEmailIsAdmin } = require('../middleware/checkEmailIsAdmin')
const { encodePassword } = require('../middleware/encodePassword')

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
