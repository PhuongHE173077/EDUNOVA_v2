import express from 'express'
import { answerLessonController } from '~/controllers/answerLessonController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { answerLessonValidation } from '~/validations/answerLessonValidation'


const Router = express.Router()
Router.route('/:id')
    .put(authMiddlewares.isAuthorized, answerLessonController.updateAnswer)

Router.route('/')
    .post(authMiddlewares.isAuthorized, answerLessonValidation.create, answerLessonController.createNew)
    .get(authMiddlewares.isAuthorized, answerLessonController.getAnswerByQuestionId)


export const answerLessonRouter = Router
