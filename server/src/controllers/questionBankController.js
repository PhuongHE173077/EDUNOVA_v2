import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { questionBankModel } from "~/models/questionBankModel"

const getAll = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        console.log("🚀 ~ getAll ~ userId:", userId)
        const result = await questionBankModel.getByUserId(userId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }

}
const createNew = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const newQuestion = {
            ...req.body,
            userId: new ObjectId(userId)
        }
        await questionBankModel.createNew(newQuestion)
        res.status(StatusCodes.OK).json(questionBankModel)
    } catch (error) {
        next(error)
    }

}

export const questionBankController = {
    getAll,
    createNew
}