import express from 'express'

import { userRoutes } from './userRoute'
import { semesterRouter } from './semesterRouter'
import { courseRouter } from './courseRouter'
import { lessonRouter } from './lessonRouter'


const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'Api v1 is ready' })
})

Router.use('/', userRoutes)
Router.use('/semesters', semesterRouter)
Router.use('/courses', courseRouter)
Router.use('/lessons', lessonRouter)


export const APIs_V1 = Router