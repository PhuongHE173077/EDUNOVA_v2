import express from 'express'
import { semesterController } from '~/controllers/semesterController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { USER_ROLE } from '~/utils/constants'


const Router = express.Router()

Router.route('/')
    .get(authMiddlewares.isAuthorized([USER_ROLE.ADMIN, USER_ROLE.STUDENT]), semesterController.getSemestersByUser)

export const semesterRouter = Router