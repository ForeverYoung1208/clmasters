const express = require('express')
const path = require('path')
const cors = require('cors')
require('dotenv').config()

const {APP_BUILD_FOLDER} = process.env

let PORT;
switch (process.env.NODE_ENV) {
  case 'development':
    PORT = process.env.APP_PORT_DEV || 5000
    break;
  case 'production':
    PORT = process.env.APP_PORT_PROD || 5001
    break;
  default:
    console.log('unknown NODE_ENV, app port set to 5000 ')
    PORT = 5000
}


const app = express();

app.use(cors())

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes') )
app.use('/api/cities', require('./routes/cities.routes') )
app.use('/api/clocks', require('./routes/clocks.routes') )
app.use('/api/preorder', require('./routes/preorder.routes') )



//  SERVING FRONTEND 
if(process.env.NODE_ENV === 'production'){
  app.use('/', express.static( path.join(__dirname, APP_BUILD_FOLDER ) ))
  app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, APP_BUILD_FOLDER, 'index.html'))
  })
}


app.listen(PORT, ()=>{ console.log(`App has been started on port ${PORT}`) })
