import { courseModel } from "~/models/courseModel"
import { scheduleModel } from "~/models/scheduleModel"
import { USER_ROLE } from "~/utils/constants"

const getScheduleByUserId = async (userId, role) => {
    try {
        if (role == USER_ROLE.LECTURER) {
            return await scheduleModel.getScheduleByLectureId(userId)
        }
        const courses = await courseModel.getCourseByUserId(userId)
        const getScheduleByCourseId = await scheduleModel.getScheduleByCourseId(courses.map(item => item._id));

        const schedule = getScheduleByCourseId.map(item => {
            return {
                ...item,
                course: courses.find(course => course._id.equals(item.courseId))
            }
        })


        return schedule
    } catch (error) {
        throw error
    }
}
export const scheduleService = { getScheduleByUserId }