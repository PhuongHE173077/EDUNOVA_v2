import express from 'express'
import { examController } from '~/controllers/examController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'



const Router = express.Router()


Router.route('/:id')
    .post(authMiddlewares.isAuthorized, examController.createNew)
    .get(authMiddlewares.isAuthorized, examController.getExamsByCourseId)
    .put(authMiddlewares.isAuthorized, examController.updateExam)

Router.route('/')
    .get(authMiddlewares.isAuthorized, examController.getExamDetail)

export const examRouter = Router