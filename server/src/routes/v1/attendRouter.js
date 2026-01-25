import express from 'express'
import { attendController } from '~/controllers/attendController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'


const Router = express.Router()

Router.route('/schedule/:scheduleId')
    .post(authMiddlewares.isAuthorized, attendController.createNew)
    .get(authMiddlewares.isAuthorized, attendController.getAnswerByScheduleId)
Router.route('/')
    .get(authMiddlewares.isAuthorized, attendController.getAll)


export const attendRouter = Router
