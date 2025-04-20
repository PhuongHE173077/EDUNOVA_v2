import express from 'express'
import { CONNECT_DB } from './config/mongodb'
import { env } from './config/environment'
import cookieParser from 'cookie-parser'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'
var cors = require('cors')
const app = express()

const START_SERVER = () => {

  const hostname = env.HOST
  const port = env.PORT

  app.use(cors(corsOptions))

  app.use(express.json())

  app.use(cookieParser())

  app.use(errorHandlingMiddleware)

  app.listen(port, hostname, () => {
    console.log(`Hello , I am running at ${hostname}:${port}/`)
  })
}


CONNECT_DB()
  .then(() =>
    console.log('Connected database successfully !'))
  .then(() => START_SERVER())
  .catch((error) => {
    console.log(error)
    process.exit(0)
  })


