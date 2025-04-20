import express from 'express'
import { userRoutes } from './userRoute'

const Router = express.Router()

Router.use('/', userRoutes)

export const APIs_V1 = Router