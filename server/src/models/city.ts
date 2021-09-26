import { DataTypes, Optional, Sequelize, Model} from 'sequelize'

// import { DataTypes, Optional, Sequelize } from 'sequelize'
// import { PaginatedModel as Model } from './PaginatedModel/PaginatedModel'

interface ICityAttr {
  id:number
  name: string
  comment: string
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date  
}
// interface CityCreationAttr extends Optional<CityAttr, "id"> { }

module.exports = (sequelize: Sequelize) => {
  class City extends Model<ICityAttr> implements ICityAttr {
    id!: number
    name!: string
    comment: string = ''
    isActive: boolean = true
    createdAt?: Date | undefined
    updatedAt?: Date | undefined
    
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
      id: { primaryKey: true, type: DataTypes.NUMBER },
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
