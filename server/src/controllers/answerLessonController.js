import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { answerLessonService } from "~/services/answerLessonService"

const createNew = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const newAnswer = {

            questionId: new ObjectId(req.body.questionId),
            answer: req.body.answer,
            urlFile: req.body.urlFile ? req.body.urlFile : '',
            star: 0,
            userId: new ObjectId(userId),
            type: req.body.type,
            answerAt: Date.now()
        }
        const result = await answerLessonService.createNew(newAnswer)
        res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
        next(error)
    }
}

const getAnswerByQuestionId = async (req, res, next) => {
    try {
        const { questionId, page } = req.query

        const result = await answerLessonService.getAnswerByQuestionId(questionId, page)
        res.status(StatusCodes.OK).json(result)

    } catch (error) {
        throw error
    }
}

const updateAnswer = async (req, res, next) => {
    try {
        const data = req.body
        const id = req.params.id
        const result = await answerLessonService.updateAnswer(id, data)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        throw error
    }
}

export const answerLessonController = {
    createNew,
    getAnswerByQuestionId,
    updateAnswer
}