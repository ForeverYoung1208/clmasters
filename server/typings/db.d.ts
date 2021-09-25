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
export const keysOfConfigDBs = ['test', 'development', 'production'] as const
export type TKeyOfConfigDBs = typeof keysOfConfigDBs[number]

export type TConfigDBs = {
  [key: string]: TConfigDB,   /// need to change 'string' to 'TKeyOfConfigDBs' !!!!
}

export function isTKeyOfconfigDBs(givenKey: string | undefined): givenKey is TKeyOfConfigDBs{
  return (givenKey && keysOfConfigDBs.includes(givenKey))
}

export interface ISequelizeDB {
  sequelize: Sequelize
  Sequelize: typeof Sequelize
  [key: string]: MyModel
}