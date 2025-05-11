import { ObjectId } from "mongodb"
import { examModel } from "~/models/examModel"
import { questionExamModel } from "~/models/questionExamModel"
import { resultExamModel } from "~/models/resultExamModel"
import { STATUS_EXAM } from "~/utils/constants"

const createNew = async (data, courseId) => {
    try {
        const dataExam = {
            title: data.title,
            time: data.time,
            imageCover: data.imageCover,
            date: new Date(data.date) || Date.now(),
            viewAnswer: data.viewAnswer,
            courseId: new ObjectId(courseId),
            status: STATUS_EXAM.PENDING
        }

        const newExam = await examModel.createNew(dataExam)
        const dataQuestions = data.questions.map((question) => {
            return {
                ...question,
                examId: newExam.insertedId
            }
        })
        const newQuestion = await questionExamModel.createMany(dataQuestions)
        return {
            mess: 'success',
            data: {
                newExam,
                newQuestion
            }
        }
    } catch (error) {
        throw error
    }
}

const getExamsByCourseId = async (courseId, userId) => {
    try {
        const result = await examModel.getExamsByCourseId(courseId)

        return result
    } catch (error) {
        throw error
    }
}
const getExamDetail = async (examId, userId) => {
    try {
        const resultExam = await resultExamModel.findByExamIdAddUserId(examId, userId)
        const exam = await examModel.getExamDetail(examId)
        if (resultExam && resultExam.answers && resultExam.answers.length > 0) {
            exam.questions = resultExam.answers
            return {
                message: 'doing',
                data: exam
            }
        }
        return {
            message: 'not doing',
            data: exam
        }
    } catch (error) {
        throw error
    }
}

const updateExam = async (id, data) => {
    try {
        return await examModel.update(id, data)
    } catch (error) {
        throw error
    }
}

export const examService = {
    createNew,
    getExamsByCourseId,
    getExamDetail,
    updateExam
}