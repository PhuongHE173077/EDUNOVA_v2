import { StatusCodes } from "http-status-codes"
import { courseModel } from "~/models/courseModel"
import { lessonModel } from "~/models/lessonModel"
import ApiError from "~/utils/ApiError"

const getLessonByCourseId = async (courseId) => {
    try {
        const courseExist = await courseModel.findOneById(courseId)
        if (!courseExist) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found!')
        }
        const result = await lessonModel.getLessonByCourseId(courseId)
        return result
    } catch (error) {
        throw error
    }
}

export const lessonService = {
    getLessonByCourseId
}