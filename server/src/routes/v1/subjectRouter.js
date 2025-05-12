import express from 'express'
import { subjectController } from '~/controllers/subjectController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'


const Router = express.Router()


Router.route('/')
    .get(authMiddlewares.isAuthorized, subjectController.getSubjects)


export const subjectRouter = Router
