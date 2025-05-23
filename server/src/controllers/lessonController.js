import { StatusCodes } from "http-status-codes"
import { lessonService } from "~/services/lessionService"

const getLessonById = async (req, res, next) => {
    try {
        const id = req.params.id
        const populate = req.query.populate
        let result
        if (populate) {
            result = await lessonService.getLessonByCourseId(id)
        } else {
            result = await lessonService.getLessonById(id)
        }




        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const lessonController = {
    getLessonById
}