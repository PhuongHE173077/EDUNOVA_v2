import express from 'express'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { courseController } from '../../controllers/courseController'
import { courseValidation } from '~/validations/courseValidation'


const Router = express.Router()


Router.route('/')
    .get(authMiddlewares.isAuthorized, courseController.getCourseByUserId)
    .post(authMiddlewares.isAuthorized, courseValidation.create, courseController.createCourse)

Router.route('/:id')
    .get(authMiddlewares.isAuthorized, courseController.getCourseById)
    .put(authMiddlewares.isAuthorized, courseController.updateCourse)



export const courseRouter = Router
