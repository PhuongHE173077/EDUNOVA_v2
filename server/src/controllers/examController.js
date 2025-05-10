import { StatusCodes } from "http-status-codes"
import { examService } from "~/services/examService"

const createNew = (req, res, next) => {
    try {
        const courseId = req.params.courseId
        const data = req.body
        const result = examService.createNew(data, courseId)
        res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
        throw error
    }
}

export const examController = {
    createNew
}