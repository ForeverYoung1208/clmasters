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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json({extended: true}))
app.use('/api/auth', routes.auth)


app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

