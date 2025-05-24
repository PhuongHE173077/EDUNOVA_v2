import { courseModel } from "~/models/courseModel"
import { semesterModel } from "~/models/semesterModel"

const getSemesterByUserId = async (userId) => {
    try {

        //Get all course,what user is enrolled
        const getCourseByUserId = await courseModel.getCourseByUserId(userId)

        let result = []
        //If user is not enrolled in any course,then return last semester
        if (!getCourseByUserId) {
            const data = await semesterModel.getAll()
            return data[data.length - 1]

        }

        //loop through all enrolled course
        getCourseByUserId.forEach((course) => {
            const { semester } = course
            if (!semester || !semester._id) return;
            if (result.length === 0 || !result.find((item) => item._id.equals(semester._id))) {
                result.push(semester);
            }
        })

        return result
    } catch (error) {
        throw error
    }
}

const getCurrentSemester = async () => {
    try {
        const data = await semesterModel.getAll()

        const currentDate = new Date()

        const currentSemester = data.find(s =>
            currentDate.getTime() >= s.startDate.getTime() &&
            currentDate.getTime() <= s.endDate.getTime()
        );

        return currentSemester
    } catch (error) {
        throw error
    }
}

const createSemester = async (data) => {
    try {
        const result = await semesterModel.createNew(data)
        return result
    } catch (error) {
        throw error
    }
}

const deleteSemester = async (id) => {
    try {
        const result = await semesterModel.deleteById(id)

        if (!result) {
            throw new Error('Semester not found')
        }

        return result
    } catch (error) {
        throw error
    }
}
const getAllSemesters = async () => {
    return await semesterModel.getAllSemesters(); // gọi model
  };
  
export const semesterService = {
    getSemesterByUserId,
    getCurrentSemester,
    createSemester,
    deleteSemester,
    getAllSemesters
}