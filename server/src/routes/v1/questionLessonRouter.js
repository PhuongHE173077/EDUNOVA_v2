import express from 'express'
import { questionLessonController } from '~/controllers/questionLessonController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'



const Router = express.Router()


Router.route('/:id')
    .get(authMiddlewares.isAuthorized, questionLessonController.getQuestionByLessonId)

export const questionLessonRouter = Router