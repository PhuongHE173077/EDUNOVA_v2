import { questionLessonModel } from "~/models/questionLessonModel"

const getQuestionByLessonId = async (id) => {
    try {
        return await questionLessonModel.getQuestionByLessonId(id)
    } catch (error) {
        throw error
    }
}
const getQuestionById = async (id) => {
    try {
        return await questionLessonModel.findOneById(id)
    } catch (error) {
        throw error
    }
}

export const questionLessonService = {
    getQuestionByLessonId,
    getQuestionById
}

