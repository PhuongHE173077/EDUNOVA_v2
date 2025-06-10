import { StatusCodes } from "http-status-codes"
import { conversationModel } from "~/models/conversationModel"

const getConversationByUserId = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const filterConversation = await conversationModel.getByUserId(userId)

        res.status(StatusCodes.OK).json(filterConversation)
    } catch (error) {
        next(error)
    }
}

const createConversation = async (req, res, next) => {
    try {

    } catch (error) {
        next(error)
    }
}


export const conversationController = {

    getConversationByUserId,
    createConversation
}