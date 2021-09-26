import { Dialect, Model, Sequelize } from "sequelize/types"
import { MyModel } from "typings/model"

export type TConfigDB = {
  username: string,
  password: string,
  database: string,
  options: {
    host: string,
    port: number | undefined,
    dialect: Dialect,
    logging?: boolean,
  }
}

// nice sample and explanation of making types from array
// https://steveholgado.com/typescript-types-from-arrays/

export type TKeyOfConfigDBs = typeof keysOfConfigDBs[number]

export type TConfigDBs = {
  [key: string]: TConfigDB,
}

export interface ISequelizeDB {
  sequelize: Sequelize
  Sequelize: typeof Sequelize
  [key: string]: MyModel
}