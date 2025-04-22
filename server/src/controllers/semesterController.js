const { StatusCodes } = require("http-status-codes")
const { semesterService } = require("~/services/semesterService")

const getSemestersByUser = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const result = await semesterService.getSemestersByUser(userId)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const semesterController = {
    getSemestersByUser
}