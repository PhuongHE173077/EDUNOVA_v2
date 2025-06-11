import { StatusCodes } from "http-status-codes"
import { subjectModel } from "~/models/subjectModel"
import { subjectService } from "~/services/subjectService"

const getSubjects = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const semesterId = req.query.semesterId
        if (semesterId) {
            const result = await subjectService.getSubjects(semesterId, userId)
            return res.status(StatusCodes.OK).json(result)
        }

        const result = await subjectModel.getAll()

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const subjectController = {
    getSubjects
}