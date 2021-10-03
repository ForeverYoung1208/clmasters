import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import configDBs from '../config/configDB'
import { ISequelizeDB, TConfigDB } from 'typings/db'

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'

let configDB: TConfigDB

if (Object.keys(configDBs).includes(env)) {
  configDB = configDBs[env]
} else {
  throw new Error(`No database config found for environment ${env}`)
}

let sequelize = new Sequelize(
  configDB.database,
  configDB.username,
  configDB.password,
  configDB.options
)

const db = {} as ISequelizeDB

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      /\.(j|t)s$/.test(file.slice(-3))
    )
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize)
    
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  const t = db[modelName]
  if (t.associate) {
    t.associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

// module.exports = db
export default db
