import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { courseModel } from "~/models/courseModel"
import { scheduleModel } from "~/models/scheduleModel"
import { scheduleService } from "~/services/scheduleService"
import { generateSlots } from "~/utils/algorithms"
import { COURSE_STATUS } from "~/utils/constants"

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

const createNew = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const courseId = req.body.courseId
        const course = await courseModel.findOneById(courseId)


        if (!course) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Course not found!')
        }

        // gen slot for schedule 
        const slots = generateSlots(course.startDate, req.body.startTime, req.body.endTime, req.body.days, course.subject.curriculums.length)
        const newData = slots.map(item => ({
            courseId: new ObjectId(courseId),
            lectureId: new ObjectId(course.lecturer._id),
            start: new Date(item.start),
            end: new Date(item.end),
            room: req.body.room,
            status: 'offline'
        }))

        // create schedule
        await scheduleModel.createMany(newData)

        // update status course to had schedule
        await courseModel.update(courseId, { status: COURSE_STATUS.ACTIVE })


        res.status(StatusCodes.OK).json(slots)
    } catch (error) {
        next(error)
    }
}

export const scheduleController = { getScheduleByUserId, createNew }