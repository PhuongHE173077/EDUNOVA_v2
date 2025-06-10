import express from 'express'
import { messageController } from '~/controllers/messageController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'


const Router = express.Router()

Router.route("/:id")
    .get(authMiddlewares.isAuthorized, messageController.getMessagesByConversationId)
    .post(authMiddlewares.isAuthorized, messageController.createNewMessage)


export const messageRouter = Router
