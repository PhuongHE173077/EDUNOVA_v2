import express from 'express'
import { userRoutes } from './userRoute'
import { semesterRouter } from './semesterRouter'

const Router = express.Router()

Router.use('/', userRoutes)
Router.use('/semesters', semesterRouter)

export const APIs_V1 = Router