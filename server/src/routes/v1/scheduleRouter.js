import express from 'express'
import { scheduleController } from '~/controllers/scheduleController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'



const Router = express.Router()

Router.route('/')
    .get(authMiddlewares.isAuthorized, scheduleController.getScheduleByUserId)
    .post(authMiddlewares.isAdmin, scheduleController.createNew)

export const scheduleRouter = Router