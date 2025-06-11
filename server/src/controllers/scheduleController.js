import { StatusCodes } from "http-status-codes"
import { courseModel } from "~/models/courseModel"
import { scheduleService } from "~/services/scheduleService"

const getScheduleByUserId = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const role = req.jwtDecoded.role
        const result = await scheduleService.getScheduleByUserId(userId, role)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const createNew = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const courseId = req.body.courseId
        const course = await courseModel.findOneById(courseId)
        console.log("🚀 ~ createNew ~ course:", req.body)

        if (!course) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found!')
        }


        // const result = await scheduleService.getScheduleByUserId(userId, role)
        res.status(StatusCodes.OK).json(userId)
    } catch (error) {
        next(error)
    }
}

export const scheduleController = { getScheduleByUserId, createNew }