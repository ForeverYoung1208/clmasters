import fs from 'fs'
import path from 'path'
import Sequelize from 'sequelize'
import configs from '../config/configDB.js'

const basename = path.basename(import.meta.url)
const __dirname = path.dirname(import.meta.url).slice(7)  // throw out 'file://'

const env = process.env.NODE_ENV || 'development'

const config = configs[env]
const models = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

// test connection
async function testConnection(){
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
testConnection()


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(async (file) => {
    const model = await import(path.join(__dirname, file))
    model(sequelize, Sequelize.DataTypes)
    models[model.name] = model
  })

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models)
  }
})

models.sequelize = sequelize
models.Sequelize = Sequelize

export default models

