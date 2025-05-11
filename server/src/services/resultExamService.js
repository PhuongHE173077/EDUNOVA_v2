import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { examModel } from "~/models/examModel"
import { resultExamModel } from "~/models/resultExamModel"
import { userModal } from "~/models/userModal"
import { evaluateAnswers } from "~/utils/algorithms"
import ApiError from "~/utils/ApiError"
import { STATUS_EXAM } from "~/utils/constants"

const createNew = async (data) => {
    try {

        const userExist = await userModal.findOneById(data.userId)
        if (!userExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
        }

        const resultExit = await resultExamModel.findByExamIdAddUserId(data.examId, data.userId)
        if (!resultExit) {
            const examExist = await examModel.findOneById(data.examId)
            if (!examExist) {
                throw new ApiError(StatusCodes.NOT_FOUND, 'Exam not found!')
            } else if (examExist.status !== STATUS_EXAM.START) {
                throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'This exam is not doing!')
            } else {
                const minutes = parseInt(examExist.time, 10);
                const newRs = await resultExamModel.createNew({
                    ...data,
                    dueTime: new Date(Date.now() + minutes * 60 * 1000)
                })
                return await resultExamModel.findOneById(newRs.insertedId)
            }
        }

        const now = Date.now();

        if (now > resultExit.dueTime) {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'The time is over!')
        }
        if (resultExit.type && resultExit.type === 'finish') {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'You have finished this exam!')
        }

        return resultExit
    } catch (error) {
        throw error
    }
}

const updateResult = async (data) => {
    try {

        const userExist = await userModal.findOneById(data.userId)
        if (!userExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
        }
        const examExist = await examModel.findOneById(data.examId)
        if (!examExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Exam not found!')
        }

        const resultExit = await resultExamModel.findByExamIdAddUserId(data.examId, data.userId)
        if (!resultExit) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Result not found!')
        }

        const now = Date.now();

        if (now > resultExit.dueTime) {
            throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'The time is over!')
        }

        const examDetail = await examModel.getExamDetailHasAnswer(data.examId)

        const result = evaluateAnswers(examDetail.questions, data.answers)

        const dataUpdate = {
            answers: data.answers.map((item) => {
                return {
                    ...item,
                    _id: new ObjectId(item._id),
                    examId: new ObjectId(data.examId),
                }
            }),
            score: (10 / examDetail.questions.length) * result.filter((item) => item.isCorrect).length,
            completeAt: Date.now(),
            type: data.type
        }

        const resultUpdate = await resultExamModel.update(resultExit._id, dataUpdate)

        return {
            message: 'Update success',
            completeAt: resultUpdate.completeAt
        }
    } catch (error) {
        throw error
    }
}

const getAFew = async (userId) => {
    try {
        const resultExit = await resultExamModel.findByUserId(userId)
        const result = resultExit.map((item) => {
            return {
                _id: item._id,
                examId: item.examId,
                dueTime: item.dueTime,
                type: item.type
            }
        })
        return result
    } catch (error) {
        throw error
    }
}


export const resultExamService = { createNew, updateResult, getAFew }