import express from 'express'
import { lessonController } from '~/controllers/lessonController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'


const Router = express.Router()

Router.route('/:id')
    .get(authMiddlewares.isAuthorized, lessonController.getLessonByCourseId)

export const lessonRouter = Router
