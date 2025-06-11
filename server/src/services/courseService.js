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

const updateCourse = async (courseId, data) => {
    try {
        console.log("[Service] updateCourse - courseId:", courseId);
        console.log("[Service] updateCourse - data:", data);

        const result = await courseModel.update(courseId, data);

        console.log("[Service] updateCourse - result:", result);

        return result;
    } catch (error) {
        console.error("[Service] updateCourse - error:", error);
        throw error;
    }
};


const createCourse = async (data) => {
    try {
        const result = await courseModel.createNew(data)
        return result
    } catch (error) {
        throw error
    }
}

const deleteCourse = async (courseId) => {
    try {
        const result = await courseModel.deleteById(courseId)
        return result
    } catch (error) {
        throw error
    }
}

const getAllCourses = async () => {
    try {
        const result = await courseModel.getAll()
        return result
    } catch (error) {
        throw error
    }
}


export const getCourseBySemesterId = async (semesterId) => {
    try {
        return await courseModel.getCourseBySemesterId(semesterId)
    } catch (error) {
        throw error
    }
}
export const courseService = {
    getCourseByUserId,
    getCourseById,
    getCourseBySemesterIdAndSubjectId,
    updateCourse,
    createCourse,
    deleteCourse,
    getAllCourses,
    getCourseBySemesterId
}