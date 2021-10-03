import { Request, Response } from 'express'
import { check } from 'express-validator'
import { PaginatedModel } from 'src/models/PaginatedModel/PaginatedModel'
import { IUserAttr, TUser, TUserCtor } from 'typings/models/user'
import { TPaginatedModelCtor } from 'typings/paginatedModel'
import db from '../models'
import { noTimestamps } from '../shared/services'
import { CRUDController } from './common/CRUDController'

const User = db.User as TUserCtor

class UsersController extends CRUDController {
  model!: TUserCtor
  constructor(model: TPaginatedModelCtor<IUserAttr>) {
    super(model)
  }

  // real delete !!!
  async delete(req: Request, res: Response): Promise<Response> {
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
    } catch (error: any) {
      return res.status(400).json({
        message: `CDUD controller: error with deletion model id:${id}: ${error.name}`,
      })
    }
  }

  // overrides parent CRUDcontroller method
  async getAll(
    req: Request,
    res: Response
  ): Promise<
    Response<
      | { errors: Array<{ param: string; msg: string }> }
      | {
          totalCount: number
          currentPage: number
          data: Array<Omit<IUserAttr, 'password'>>
        }
    >
  > {
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
      // const { wipedPassword, ...userDataNoPassword } = m.dataValues
      const { password: wipedPassword, ...userDataNoPassword } = m.dataValues
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

export const usersController = new UsersController(User)
