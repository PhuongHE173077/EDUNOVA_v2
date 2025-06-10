import express from 'express'
import { conversationController } from '~/controllers/conversationController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'


const Router = express.Router()

Router.route('/')
    .get(authMiddlewares.isAuthorized, conversationController.getConversationByUserId)
    .post(authMiddlewares.isAuthorized, conversationController.createConversation)

export const conversationRouter = Router
