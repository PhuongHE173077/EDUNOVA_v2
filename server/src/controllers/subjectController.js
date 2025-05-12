import { StatusCodes } from "http-status-codes"
import { subjectService } from "~/services/subjectService"

const getSubjects = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id
        const semesterId = req.query.semesterId
        const result = await subjectService.getSubjects(semesterId, userId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const subjectController = {
    getSubjects
}