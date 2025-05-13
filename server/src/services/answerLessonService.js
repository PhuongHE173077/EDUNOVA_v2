import { StatusCodes } from "http-status-codes"
import { answerLessonModel } from "~/models/answerLessonModel"
import { courseModel } from "~/models/courseModel"
import { lessonModel } from "~/models/lessonModel"
import { questionLessonModel } from "~/models/questionLessonModel"
import ApiError from "~/utils/ApiError"
import { ITEMS_PER_PAGE } from "~/utils/constants"

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

const getAnswerByQuestionId = async (questionId, page = 1) => {
    try {
        const itemsPerPage = ITEMS_PER_PAGE
        const result = await answerLessonModel.findAnswersByQuestionId(questionId, page, itemsPerPage)

        return result
    } catch (error) {
        throw error
    }
}

const updateAnswer = async (id, data) => {
    try {
        const result = await answerLessonModel.update(id, data)
        return result
    } catch (error) {
        throw error
    }
}

export const answerLessonService = {
    createNew,
    getAnswerByQuestionId,
    updateAnswer
}