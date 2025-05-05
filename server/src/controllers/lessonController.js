import { StatusCodes } from "http-status-codes"
import { lessonService } from "~/services/lessionService"

const getLessonByCourseId = async (req, res, next) => {
    try {
        const courseId = req.params.id

        const result = await lessonService.getLessonByCourseId(courseId)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const lessonController = {
    getLessonByCourseId
}