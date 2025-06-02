import express from 'express'
import { resultExamController } from '~/controllers/resultExamController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'



const Router = express.Router()

Router.route('/')
    .post(authMiddlewares.isAuthorized, resultExamController.createNew)
    .put(authMiddlewares.isAuthorized, resultExamController.updateResult)
    .get(authMiddlewares.isAuthorized, resultExamController.getResultByExamId)

Router.route('/af')
    .get(authMiddlewares.isAuthorized, resultExamController.getAFew)
Router.route('/:id')
    .get(authMiddlewares.isAuthorized, resultExamController.getDetail)

export const resultExamRouter = Router