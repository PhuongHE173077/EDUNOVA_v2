import { StatusCodes } from "http-status-codes"
import { courseService } from "~/services/courseService"

const getCourseByUserId = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const result = await courseService.getCourseByUserId(userId)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const getCourseById = async (req, res, next) => {
    try {
        const courseId = req.params.id

        const result = await courseService.getCourseById(courseId)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const courseController = {
    getCourseByUserId,
    getCourseById
}