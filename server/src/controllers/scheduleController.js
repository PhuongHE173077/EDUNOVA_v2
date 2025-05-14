import { StatusCodes } from "http-status-codes"
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

export const scheduleController = { getScheduleByUserId }