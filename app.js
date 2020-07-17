const express = require('express');
const config = require('config');
const app = express();
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize');

const PORT = config.get('port') || 5000
const DBPASSWORD = config.get('dbpassword')
const DBNAME = config.get('dbname')
const sequelize = new Sequelize(`postgres://clm:${DBPASSWORD}@localhost:5432/${DBNAME}`)

// to disringuish the body of post requests
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(PORT, ()=>{
  console.log(`App has been started on port ${PORT}`)
})

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

async function testConnection(){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
testConnection();