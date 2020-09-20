const { User } = require('../models')
const { CRUDController } = require('./common/CRUDController')

class UsersController extends CRUDController{
  constructor(model){
    super(model)
  }
}


exports.usersController = new UsersController(User)