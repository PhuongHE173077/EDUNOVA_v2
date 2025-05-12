import { courseModel } from "~/models/courseModel"
import { subjectModel } from "~/models/subjectModel"

const getSubjects = async (semesterId, userId) => {
    try {
        const subjects = await subjectModel.getAll()
        if (semesterId) {
            const course = await courseModel.getCourseBySemesterId(semesterId)
            const uniqueSubjectIds = [...new Set(course.map(item => item.subjectId))];
            const uniqueSubjectIdsStr = uniqueSubjectIds.map(id => id.toString());
            return subjects.filter(item => uniqueSubjectIdsStr.includes(item._id.toString()));
        }
        return subjects
    } catch (error) {
        next(error)
    }
}

export const subjectService = {
    getSubjects
}