import { StatusCodes } from "http-status-codes"
import { semesterService } from "~/services/semesterService"

const getSemesterByUserId = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const result = await semesterService.getSemesterByUserId(userId)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const getCurrentSemester = async (req, res, next) => {
    try {

        const result = await semesterService.getCurrentSemester()

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const semesterController = {
    getSemesterByUserId,
    getCurrentSemester
}