import express from 'express'
import { recordController } from '~/controllers/recordController'
import { resultExamController } from '~/controllers/resultExamController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'



const Router = express.Router()

Router.route('/')
    .get(authMiddlewares.isAuthorized, recordController.getAll)

Router.route('/:id')
    .put(authMiddlewares.isAuthorized, recordController.updateRecord)


export const recordRouter = Router