import { StatusCodes } from "http-status-codes"
import { questionLessonService } from "~/services/questionLessonService"

const getQuestionByLessonId = async (req, res, next) => {
    try {
        const question = await questionLessonService.getQuestionByLessonId(req.params.id)
        res.status(StatusCodes.OK).json(question)
    } catch (error) {
        next(error)
    }
}

export const questionLessonController = {
    getQuestionByLessonId
}