import express from 'express'
import { semesterController } from '~/controllers/semesterController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'


const Router = express.Router()


Router.route('/')
    .get(authMiddlewares.isAuthorized, semesterController.getSemesterByUserId)
    .post(authMiddlewares.isAuthorized, semesterController.createSemester)

Router.route('/:id')
    .delete(authMiddlewares.isAuthorized, semesterController.deleteSemester)

Router.route('/current_semester')
    .get(authMiddlewares.isAuthorized, semesterController.getCurrentSemester)
export const semesterRouter = Router
