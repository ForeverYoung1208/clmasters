const { Router } = require('express')
const { mastersController } = require('../controllers/mastersController')
const { accessTokenToEmail } = require('../middleware/accessTokenToEmail')
const { checkEmailIsAdmin } = require('../middleware/checkEmailIsAdmin')

const router = Router()

router.get(
  '/',
  async (req, res) => mastersController.getAll(req, res)
)

router.put(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  mastersController.putValidators(),
  async (req, res) => mastersController.put(req, res)
)

router.post(
  '/',
  accessTokenToEmail,
  checkEmailIsAdmin,
  mastersController.postValidators(),
  async (req, res) => mastersController.post(req, res)
)

router.delete(
  '/:id',
  accessTokenToEmail,
  checkEmailIsAdmin,
  async (req, res) => mastersController.delete(req, res)
)

module.exports = router