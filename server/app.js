import express from 'express'
import path from 'path'
import cors from 'cors'
import dotenv from 'dotenv'

(async function () {

  dotenv.config()
  
  const routesModule = await import('./routes/index.js')
  const { routes } = await routesModule

  const { APP_BUILD_FOLDER } = process.env

  let PORT
  switch (process.env.NODE_ENV) {
  case 'development':
    PORT = process.env.APP_PORT_DEV || 5000
    break
  case 'production':
    PORT = process.env.APP_PORT_PROD || 5001
    break
  default:
    console.log('unknown NODE_ENV, app port set to 5000 ')
    PORT = 5000
  }


  const app = express()


  app.use(cors())

  app.use(express.json({ extended: true }))
  
  console.log('[===========routes]', routes)

  app.use('/api/auth', await routes.auth)
  app.use('/api/cities', await routes.cities)
  app.use('/api/clocks', await routes.clocks)
  app.use('/api/preorder', await routes.preorder)
  app.use('/api/orders', await routes.orders)
  app.use('/api/masters', await routes.masters)
  app.use('/api/users', await routes.users)

  //  SERVING FRONTEND 
  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, APP_BUILD_FOLDER)))
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, APP_BUILD_FOLDER, 'index.html'))
    })
  }


  app.listen(PORT, () => { console.log(`App has been started on port ${PORT}`) })

}())