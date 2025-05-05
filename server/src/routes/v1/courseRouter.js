import express from 'express'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { courseController } from '../../controllers/courseController'


const Router = express.Router()


Router.route('/')
    .get(authMiddlewares.isAuthorized, courseController.getCourseByUserId)

Router.route('/:id')
    .get(authMiddlewares.isAuthorized, courseController.getCourseById)

export const courseRouter = Router
