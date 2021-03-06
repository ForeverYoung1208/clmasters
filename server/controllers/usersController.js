const { check } = require('express-validator')
const { User } = require('../models')
const { noTimestamps } = require('../shared/services')
const { CRUDController } = require('./common/CRUDController')

class UsersController extends CRUDController {
  constructor(model) {
    super(model)
  }

  // real delete !!!
  async delete(req, res) {
    const { id } = req.params

    try {
      const deletedRows = await this.model.destroy({
        where: { id },
        force: true, // real deletion - to check FK constraints!!!
      })

      if (deletedRows < 1)
        return res.status(400).json({
          message: `CDUD controller: model with id:${id} can not be deleted`,
        })
      return res.sendStatus(204)
    } catch (error) {
      return res.status(400).json({
        message: `CDUD controller: error with deletion model id:${id}: ${error.name}`,
      })
    }
  }

  // overrides parent CRUDcontroller method
  async getAll(req, res) {
    const { page, pageSize } = req.query
    if (page && !pageSize) {
      res.status(400).json({
        errors: [
          {
            param: 'users',
            msg: 'pageSize must be specified!',
          },
        ],
      })
    }
    if (pageSize && !page) {
      return res.status(400).json({
        errors: [
          {
            param: 'users',
            msg: 'page must be specified!',
          },
        ],
      })
    }

    const {
      count: totalCount,
      page: currentPage,
      rows,
    } = await this.model.findAllPaginated(
      { order: [['id', 'ASC']] },
      {
        page,
        pageSize,
      }
    )
    const data = rows.map((m) => {
      const { wipedPassword, ...userDataNoPassword } = m.dataValues
      return noTimestamps(userDataNoPassword)
    })
    return res.status(200).json({ totalCount, currentPage, data })
  }

  putValidators() {
    return [
      check('name', 'name must be not empty!').exists().notEmpty(),
      check('email', 'Enter correct Email address.').isEmail(),
      check('password', 'Must be longer than 2 chars')
        .if((value, { req }) => req.body.isAdmin)
        .isLength({ min: 2 }),
    ]
  }

  postValidators() {
    return [
      check('name', 'name must be not empty!').exists().notEmpty(),
      check('email', 'Enter correct Email address.').isEmail(),
      check('password', 'Must be longer than 2 chars')
        .if((value, { req }) => req.body.isAdmin)
        .isLength({ min: 2 }),
    ]
  }
}

exports.usersController = new UsersController(User)
