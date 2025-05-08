import { StatusCodes } from "http-status-codes"
import { answerLessonModel } from "~/models/answerLessonModel"
import { courseModel } from "~/models/courseModel"
import { lessonModel } from "~/models/lessonModel"
import { questionLessonModel } from "~/models/questionLessonModel"
import ApiError from "~/utils/ApiError"

const createNew = async (data) => {
    try {
        const questionExist = await questionLessonModel.findOneById(data.questionId)
        if (!questionExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Question not found!')
        }
        const result = await answerLessonModel.createNew(data)
        const newData = await answerLessonModel.findOneById(result.insertedId)

        return newData

    } catch (error) {
        throw error
    }
}

const getAnswerByQuestionId = async (questionId) => {
    try {
        const result = await answerLessonModel.findAnswersByQuestionId(questionId)

        return result
    } catch (error) {
        throw error
    }
}

export const answerLessonService = {
    createNew,
    getAnswerByQuestionId
}