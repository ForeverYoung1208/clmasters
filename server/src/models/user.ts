import { DataTypes, Sequelize } from 'sequelize'
import { IUserAttr } from 'typings/models/user'
import { PaginatedModel } from './PaginatedModel/PaginatedModel'

import bcrypt from 'bcryptjs'

module.exports = (sequelize: Sequelize) => {
  class User extends PaginatedModel<IUserAttr> implements IUserAttr {
    id!: number
    email!: string
    name!: string
    password?: string
    isAdmin?: boolean
    static async register(name: string, email: string) {
      if (await User.exists(email)) {
        return { error: 'email already taken' }
      }

      let newUser = await User.create({ name, email, isAdmin: false })
      return newUser
    }

    static async getByEmail(email: string) {
      const user = await User.findOne({ where: { email: email } })
      // if (!user) return { error: 'User email not found' }
      return user
    }

    static async authenticate(email: string, password: string) {
      const user = await User.getByEmail(email)
      if (!user) return { error: 'User email not found' }
      if (!user.password) return { error: 'User password not found'  }

      const isAuthenticated = await bcrypt.compare(password, user.password)

      if (isAuthenticated) {
        return user
      } else {
        return { error: 'Wrong password!' }
      }
    }

    static async exists(email: string) {
      const user = await User.findOne({ where: { email: email } })
      return !!user
    }

    // The `models/index` file will call this method automatically.
    // define association here
    static associate(models: any) {
      this.hasMany(models.Order, {
        as: 'orders',
        foreignKey: { name: 'userId' },
      })
    }
  }

  User.init(
    {
      id: { primaryKey: true, type: DataTypes.NUMBER },      
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )

  const lowercaseEmail = (user:User) => {
    user.email = user.email.toLowerCase()
    // return user
  }
  
  User.addHook('beforeSave', 'lowercaseEmail', lowercaseEmail)
  User.addHook('beforeUpdate', 'lowercaseEmail', lowercaseEmail)

  return User
}
