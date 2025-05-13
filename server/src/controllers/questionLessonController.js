import { StatusCodes } from "http-status-codes"
import { questionLessonService } from "~/services/questionLessonService"

const getQuestionByLessonId = async (req, res, next) => {
    try {
        const { lessonId } = req.query
        const question = await questionLessonService.getQuestionByLessonId(lessonId)
        res.status(StatusCodes.OK).json(question)
    } catch (error) {
        next(error)
    }
}

const getQuestionById = async (req, res, next) => {
    try {
        const question = await questionLessonService.getQuestionById(req.params.id)
        res.status(StatusCodes.OK).json(question)
    } catch (error) {
        next(error)
    }
}


export const questionLessonController = {
    getQuestionByLessonId,
    getQuestionById
}