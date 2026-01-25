import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { attendModel } from "~/models/attendModel"
import { scheduleModel } from "~/models/scheduleModel"
import ApiError from "~/utils/ApiError"

const createNew = async (req, res, next) => {
    try {
        const scheduleId = req.params.scheduleId

        const schedule = await scheduleModel.findOneById(scheduleId)
        if (!schedule) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Schedule not found!')
        }
        const attendanceExists = await attendModel.findOne({ scheduleId: new ObjectId(scheduleId) })
        if (attendanceExists) {
            const now = new Date();
            const startDate = new Date(schedule.start);
            const diffDays = (now - startDate) / (1000 * 60 * 60 * 24);
            if (diffDays > 2) {
                throw new ApiError(StatusCodes.FORBIDDEN, 'Quá hạn chỉnh sửa điểm danh!');
            }
            await attendModel.update(attendanceExists._id, {
                studentAttendance: req.body.map(student => ({
                    studentId: new ObjectId(student.studentId),
                    isAttend: student.isAttend
                }))
            })
            return res.status(StatusCodes.OK).json({ message: 'Attendance recorded successfully' })

        }
        const newAttendance = {
            scheduleId: new ObjectId(scheduleId),
            status: 'present',
            studentAttendance: req.body.map(student => ({
                studentId: new ObjectId(student.studentId),
                isAttend: student.isAttend
            })),
            createdAt: new Date(),
            updatedAt: new Date()
        }

        await attendModel.createNew(newAttendance)

        res.status(StatusCodes.CREATED).json({ message: 'Attendance recorded successfully' })
    } catch (error) {
        next(error)
    }
}

const getAnswerByScheduleId = async (req, res, next) => {
    try {
        const scheduleId = req.params.scheduleId
        const result = await attendModel.getAnswerByScheduleId(scheduleId)
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}
const getAll = async (req, res, next) => {
    try {
        const result = await attendModel.getAll()
        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}


export const attendController = {
    createNew,
    getAnswerByScheduleId,
    getAll
}