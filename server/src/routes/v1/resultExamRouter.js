import express from 'express'
import { resultExamController } from '~/controllers/resultExamController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'



const Router = express.Router()

Router.route('/')
    .post(authMiddlewares.isAuthorized, resultExamController.createNew)
    .put(authMiddlewares.isAuthorized, resultExamController.updateResult)

Router.route('/af')
    .get(authMiddlewares.isAuthorized, resultExamController.getAFew)

export const resultExamRouter = Router