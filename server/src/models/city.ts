import { Sequelize } from 'sequelize/types'
import { DataTypes } from 'sequelize'

import { PaginatedModel as Model } from './PaginatedModel/PaginatedModel'

module.exports = (sequelize: Sequelize) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models: any): void {
      // define association here
    }
  }
  City.init(
    {
      name: DataTypes.STRING,
      comment: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'City',
      paranoid: true,
    }
  )
  return City
}
