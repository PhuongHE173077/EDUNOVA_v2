import { StatusCodes } from "http-status-codes"
import { examService } from "~/services/examService"

const createNew = async (req, res, next) => {
    try {
        const courseId = req.params.id
        const data = req.body
        const result = await examService.createNew(data, courseId)
        res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
        throw error
    }
}

const getExamsByCourseId = async (req, res, next) => {
    try {
        const courseId = req.params.id
        const userId = req.jwtDecoded._id
        const result = await examService.getExamsByCourseId(courseId, userId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        throw error
    }
}

const getExamDetail = async (req, res, next) => {
    try {
        const examId = req.query.examId
        const userId = req.jwtDecoded._id
        const result = await examService.getExamDetail(examId, userId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        throw error
    }
}

const updateExam = async (req, res, next) => {
    try {
        const data = req.body
        const id = req.params.id
        const result = await examService.updateExam(id, data)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        throw error
    }
}

export const examController = {
    createNew,
    getExamsByCourseId,
    getExamDetail,
    updateExam
}