import express from 'express'
import { scheduleController } from '~/controllers/scheduleController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'



const Router = express.Router()

Router.route('/')
    .get(authMiddlewares.isAuthorized, scheduleController.getScheduleByUserId)

export const scheduleRouter = Router