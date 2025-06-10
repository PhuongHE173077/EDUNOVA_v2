

import cookieParser from 'cookie-parser'
import express from 'express'
import { corsOptions } from './config/cors'
import { env } from './config/environment'
import { CONNECT_DB } from './config/mongodb'
import { errorHandlingMiddleware } from './middlewares/erroHandlingMiddlewares'
import { APIs_V1 } from './routes/v1'
import { app, server } from './sockets/socket'
var cors = require('cors')

const http = require('http')
const socketIo = require('socket.io')


const START_SERVER = () => {


  app.use((req, res, next) => {
    res.set('Cache-Control', ' no-store')
    next()
  })

  app.use(cookieParser())

  const hostname = env.APP_HOST
  const port = env.APP_POST

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use('/api/v1', APIs_V1)


  //middleware erro (allways in last)
  app.use(errorHandlingMiddleware)

  server.listen(port, hostname, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at http://${hostname}:${port}/`)
  })
}

CONNECT_DB()
  .then(() =>
    // eslint-disable-next-line no-console
    console.log('Connected database successfully !'))
  .then(() => START_SERVER())
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.log(error)
    process.exit(0)
  })


