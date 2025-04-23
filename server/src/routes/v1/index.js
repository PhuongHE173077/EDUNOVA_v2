import express from 'express'

import { userRoutes } from './userRoute'


const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'Api v1 is ready' })
})

//user APIs
Router.use('/', userRoutes)


export const APIs_V1 = Router