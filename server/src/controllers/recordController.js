import { StatusCodes } from "http-status-codes"
import { courseModel } from "~/models/courseModel"
import { recordModel } from "~/models/recordModel"
import { scheduleModel } from "~/models/scheduleModel"

const getAll = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const result = await recordModel.getByLectureId(userId)
        const course = await courseModel.findOneById(result.courseId)
        const schedule = await scheduleModel.findOneById(result.scheduleId)
        result.course = course
        result.schedule = schedule

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const updateRecord = async (req, res, next) => {
    try {

        const result = await recordModel.update(req.params.id, req.body)


        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const recordController = {
    getAll,
    updateRecord
}