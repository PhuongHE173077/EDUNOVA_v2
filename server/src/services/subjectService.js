import { courseModel } from "~/models/courseModel"
import { subjectModel } from "~/models/subjectModel"

const getSubjects = async (semesterId, userId) => {
    try {
        const subjects = await subjectModel.getAll()
        // console.log("🚀 ~ getSubjects ~ subjects:", subjects)
        if (semesterId) {
            const course = await courseModel.getCourseBySemesterId(semesterId)
            console.log("🚀 ~ getSubjects ~ course:", course)
            const uniqueSubjectIds = [...new Set(course.map(item => item.subjectId))];
            // console.log("🚀 ~ getSubjects ~ uniqueSubjectIds:", uniqueSubjectIds)
            const uniqueSubjectIdsStr = uniqueSubjectIds.map(id => id.toString());
            return subjects.filter(item => uniqueSubjectIdsStr.includes(item._id.toString()));
        }
        return subjects
    } catch (error) {
        throw error
    }
}

export const subjectService = {
    getSubjects
}