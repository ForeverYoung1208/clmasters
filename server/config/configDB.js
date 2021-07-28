require('dotenv').config()
const {
  DB_PORT,
  DB_HOST,
  DB_USER,
  DB_PASS} = process.env


const configDB = 
{
  'test': {
    'username': DB_USER,
    'password': DB_PASS,
    'database': 'clmasters_test',
    'host': DB_HOST,
    'port': DB_PORT,
    'dialect': 'postgres'
  },
  'development': {
    'username': DB_USER,
    'password': DB_PASS,
    'database': 'clmasters_development',
    'host': DB_HOST,
    'port': DB_PORT,
    'dialect': 'postgres'
  },
  'production': {
    'username': DB_USER,
    'password': DB_PASS,
    'database': 'clmasters_production',
    'host': DB_HOST,
    'port': DB_PORT,
    'dialect': 'postgres'
  }
}

module.exports = configDB
