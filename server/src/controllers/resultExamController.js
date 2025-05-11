import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { resultExamService } from "~/services/resultExamService"

const createNew = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const examId = req.query.examId
        const newData = {
            ...req.body,
            examId: new ObjectId(examId),
            userId: new ObjectId(userId)
        }
        const result = await resultExamService.createNew(newData)
        res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
        next(error)
    }
}

const updateResult = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const examId = req.query.examId
        const newData = {
            ...req.body,
            examId: new ObjectId(examId),
            userId: new ObjectId(userId),
        }
        const result = await resultExamService.updateResult(newData)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const getAFew = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const result = await resultExamService.getAFew(userId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}
export const resultExamController = {
    createNew,
    updateResult,
    getAFew
}