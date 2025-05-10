import express from 'express'

import { userRoutes } from './userRoute'
import { semesterRouter } from './semesterRouter'
import { courseRouter } from './courseRouter'
import { lessonRouter } from './lessonRouter'
import { questionLessonRouter } from './questionLessonRouter'
import { answerLessonRouter } from './answerLessonRouter'
import { imageRouter } from './imageRouter'
import { examRouter } from './examRouter'


const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(200).json({ message: 'Api v1 is ready' })
})

Router.use('/', userRoutes)
Router.use('/semesters', semesterRouter)
Router.use('/courses', courseRouter)
Router.use('/lessons', lessonRouter)
Router.use('/question_lessons', questionLessonRouter)
Router.use('/answer_lessons', answerLessonRouter)
Router.use('/image', imageRouter)
Router.use('/exams', examRouter)



export const APIs_V1 = Router