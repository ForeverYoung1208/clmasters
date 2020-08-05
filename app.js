const express = require('express');
const config = require('config');
const path = require('path')

const routes = {
  auth: require('./routes/auth.routes')
}

console.log('process.env.NODE_ENV:', process.env.NODE_ENV);

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

//----------------------------------------------------------------------------

if(process.env.NODE_ENV === 'production'){
  app.use('/', express.static( path.join(__dirname,'client', 'build') ))

  app.get('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
 

}
