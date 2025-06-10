import express from 'express'

import { userRoutes } from './userRoute'
import { semesterRouter } from './semesterRouter'
import { courseRouter } from './courseRouter'
import { lessonRouter } from './lessonRouter'
import { questionLessonRouter } from './questionLessonRouter'
import { answerLessonRouter } from './answerLessonRouter'
import { imageRouter } from './imageRouter'
import { examRouter } from './examRouter'
import { resultExamRouter } from './resultExamRouter'
import { subjectRouter } from './subjectRouter'
import { scheduleRouter } from './scheduleRouter'
import { questionBankRouter } from './questionbank'
import { fileRouter } from './fileRouter'
import { conversationRouter } from './conversationRouter'
import { messageRouter } from './messageRouter'


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
Router.use('/files', fileRouter)
Router.use('/exams', examRouter)
Router.use('/result_exams', resultExamRouter)
Router.use('/subjects', subjectRouter)
Router.use('/schedules', scheduleRouter)
Router.use('/question_banks', questionBankRouter)
Router.use('/conversations', conversationRouter)
Router.use('/messages', messageRouter)



export const APIs_V1 = Router