import { StatusCodes } from "http-status-codes"
import { semesterModel } from "~/models/semesterModel"
import { userModel } from "~/models/userModel"
import ApiError from "~/utils/ApiError"

const getSemestersByUser = async (userId) => {
    try {
        const userExits = await userModel.findOneById(userId)
        if (userExits) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')
        }
        const userSemesters = await semesterModel.getSemestersByUser(userId)
        return userSemesters
    } catch (error) {
        throw new error
    }
}

export const semesterService = {
    getSemestersByUser
}