const { PaginatedModel: Model } = require('./PaginatedModel/PaginatedModel')
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static async register(name, email) {
      if (await User.exists(email)) {
        return { error: 'email already taken' }
      }

      let newUser = await User.create({ name, email, isAdmin: false })
      return newUser
    }

    static async getByEmail(email) {
      const user = await User.findOne({ where: { email: email } })
      if (!user) return { error: 'User email not found' }
      return user
    }

    static async authenticate(email, password) {
      const user = await User.getByEmail(email)
      if (user.error) return { error: user.error }

      const isAuthenticated = await bcrypt.compare(password, user.password)

      if (isAuthenticated) {
        return user
      } else {
        return { error: 'Wrong password!' }
      }
    }

    static async exists(email) {
      const user = await User.findOne({ where: { email: email } })
      return !!user
    }

    // The `models/index` file will call this method automatically.
    // define association here
    static associate(models) {
      User.orders = this.hasMany(models.Order, {
        foreignKey: {
          as: 'orders',
          name: 'userId',
        },
      })
    }
  }

  User.init(
    {
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

  const lowercaseEmail = (user) => {
    user.email = user.email.toLowerCase()
    return user
  }

  User.addHook('beforeSave', 'lowercaseEmail', lowercaseEmail)
  User.addHook('beforeUpdate', 'lowercaseEmail', lowercaseEmail)

  return User
}
