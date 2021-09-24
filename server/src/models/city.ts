'use strict'

import { DataTypes, Sequelize } from 'sequelize/types'

// const { PaginatedModel: Model } = require('./PaginatedModel/PaginatedModel')
import { PaginatedModel as Model } from './PaginatedModel/PaginatedModel')

module.exports = (sequelize: Sequelize, DT: typeof DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
    }
  }
  City.init(
    {
      name: DT.STRING,
      comment: DT.STRING,
      isActive: DT.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'City',
      paranoid: true,
    }
  )
  return City
}
