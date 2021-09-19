import express from 'express'
import { IncomingMessageWithRawBody } from 'typings/http'

// WAS // const express = require('express')
// https://stackoverflow.com/questions/28547970/typescript-require-with-type-checking
// the ways to tackle
// import express = require('express')
// import express from "express"

const path = require('path')

// import path from 'path'
const routes = require('./routes')
const cors = require('cors')
require('dotenv').config()

const { APP_BUILD_FOLDER } = process.env

let PORT: string
switch (process.env.NODE_ENV) {
  case 'test':
  case 'development':
    PORT = process.env.APP_PORT_DEV || '5000'
    break
  case 'production':
    PORT = process.env.APP_PORT_PROD || '5001'
    break
  default:
    console.log('unknown NODE_ENV, app port set to 5000 ')
    PORT = '5000'
}

const app: express.Application = express()

app.use(cors())

app.use(
  express.json({
    verify: (req: IncomingMessageWithRawBody, res, buf) => {
      req.rawBody = buf
    },
  })
)

app.use('/api/auth', routes.auth)
app.use('/api/cities', routes.cities)
app.use('/api/clocks', routes.clocks)
app.use('/api/preorder', routes.preorder)
app.use('/api/orders', routes.orders)
app.use('/api/masters', routes.masters)
app.use('/api/users', routes.users)
app.use('/api/payment', routes.payment)

// SERVING STATIC IMAGES
app.use('/img/', express.static(path.join(__dirname, APP_BUILD_FOLDER)))

//  SERVING FRONTEND
if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, APP_BUILD_FOLDER)))
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, APP_BUILD_FOLDER, 'index.html'))
  })
}

if (process.env.NODE_ENV === 'test') {
  //App has been prepeared for testing
  module.exports = app
} else {
  app.listen(PORT, () => {
    console.log(`App has been started on port ${PORT}`)
  })
}
