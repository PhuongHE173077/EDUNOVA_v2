import { StatusCodes } from "http-status-codes"
import { update } from "lodash"
import { ObjectId } from "mongodb"
import { conversationModel } from "~/models/conversationModel"
import { messageModel } from "~/models/messageModel"
import { io } from "~/sockets/socket"

const getMessagesByConversationId = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const conversationId = req.params.id

        const getMessByConversationId = await messageModel.getMessagesByConversationId(conversationId)


        res.status(StatusCodes.OK).json(getMessByConversationId)
    } catch (error) {
        next(error)
    }
}

const createNewMessage = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const conversationId = req.params.id
        const newMessage = {
            ...req.body,
            senderId: new ObjectId(userId),
            conversationId: new ObjectId(conversationId),
            seenBy: [
                new ObjectId(userId)
            ],
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const messNew = await messageModel.createNew(newMessage)

        const conversationUpdate = await conversationModel.update(conversationId,
            {
                lastMessageId: messNew.insertedId,
                updatedAt: new Date(),
            }
        )
        const filterConversation = await conversationModel.getByUserId(userId)

        const getMessByConversationId = await messageModel.getMessagesByConversationId(conversationId)

        io.emit("conversation", {
            conversationId,
            conversations: filterConversation
        })
        io.emit("message", {
            conversationId,
            messages: getMessByConversationId
        })

        res.status(StatusCodes.OK).json({
            messages: getMessByConversationId,
            conversations: filterConversation
        })
    } catch (error) {
        next(error)
    }
}


export const messageController = {

    getMessagesByConversationId,
    createNewMessage
}