const express = require('express');
const config = require('config');
const bodyParser = require('body-parser')

const routes = {
  auth: require('./routes/auth.routes')
}
//----------------------------------------------------------------------------
const PORT = config.get('port') || 5000
const app = express();


app.listen(PORT, ()=>{ console.log(`App has been started on port ${PORT}`) })

// to disringuish the body of post requests
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use('/api/auth', routes.auth)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

