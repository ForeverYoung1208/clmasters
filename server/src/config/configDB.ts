import { TConfigDBs } from 'typings/db'
import dotenv from 'dotenv'
dotenv.config()

const { DB_PORT, DB_HOST, DB_USER, DB_PASS } = process.env

if (!DB_PORT || !DB_HOST || !DB_USER || !DB_PASS) {
  throw new Error("Insufficient data provided to database connection!");
}

const configDB: TConfigDBs = {
  'test': {
    username: DB_USER,
    password: DB_PASS,
    database: 'clmasters_test',
    options: {
      host: DB_HOST,
      port: Number(DB_PORT),
      dialect: 'postgres',
      logging: false,
    }
  },
  'development': {
    username: DB_USER,
    password: DB_PASS,
    database: 'clmasters_development',
    options: {
      host: DB_HOST,
      port: Number(DB_PORT),
      dialect: 'postgres',
      logging: true,
    }
  },
  'production': {
    username: DB_USER,
    password: DB_PASS,
    database: 'clmasters_production',
    options: {
      host: DB_HOST,
      port: Number(DB_PORT),
      dialect: 'postgres',
      logging: false,
    }
  },
}

export default configDB
