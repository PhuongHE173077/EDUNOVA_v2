import express from 'express'
import { questionBankController } from '~/controllers/questionBankController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'



const Router = express.Router()

Router.route("/")
    .get(authMiddlewares.isAuthorized, questionBankController.getAll)
    .post(authMiddlewares.isAuthorized, questionBankController.createNew)

export const questionBankRouter = Router