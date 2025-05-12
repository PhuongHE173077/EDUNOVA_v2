import { courseModel } from "~/models/courseModel"

const getCourseByUserId = async (userId) => {
    try {
        const result = await courseModel.getCourseByUserId(userId)
        return result
    } catch (error) {
        throw error
    }
}

const getCourseById = async (courseId) => {
    try {
        const result = await courseModel.findOneById(courseId)
        return result
    } catch (error) {
        throw error
    }
}

export const getCourseBySemesterIdAndSubjectId = async (semesterId, subjectId) => {
    try {
        return await courseModel.getCourseBySemesterIdAndSubjectId(semesterId, subjectId)
    } catch (error) {
        throw error
    }
}
export const courseService = {
    getCourseByUserId,
    getCourseById,
    getCourseBySemesterIdAndSubjectId
}