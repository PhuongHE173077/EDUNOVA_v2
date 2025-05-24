import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { courseService } from "~/services/courseService"

const getCourseByUserId = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const semesterId = req.query.semesterId
        const subjectId = req.query.subjectId
        let result
        if (semesterId && subjectId) {
            result = await courseService.getCourseBySemesterIdAndSubjectId(semesterId, subjectId)
        } else {
            result = await courseService.getCourseByUserId(userId)
        }



        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const getCourseById = async (req, res, next) => {
    try {
        const courseId = req.params.id

        const result = await courseService.getCourseById(courseId)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const updateCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id
        const data = req.body

        const result = await courseService.updateCourse(courseId, data)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const createCourse = async (req, res, next) => {
    try {
        const data = {
            ...req.body,
            lecturerId: new ObjectId(req.body.lecturerId),
            semesterId: new ObjectId(req.body.semesterId),
            studentIds: [],
            subjectId: new ObjectId(req.body.subjectId),
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate)
        }

        const result = await courseService.createCourse(data)

        const newCourse = await courseService.getCourseById(result.insertedId)

        res.status(StatusCodes.CREATED).json(newCourse)
    } catch (error) {
        next(error)
    }
}

const deleteCourse = async (req, res, next) => {
    try {
        const courseId = req.params.id

        await courseService.deleteCourse(courseId)

        res.status(StatusCodes.NO_CONTENT).send()
    } catch (error) {
        next(error)
    }
}
const getAllCourses = async (req, res, next) => {
    try {
        const result = await courseService.getAllCourses()

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

export const courseController = {
    getCourseByUserId,
    getCourseById,
    updateCourse,
    createCourse,
    deleteCourse,
    getAllCourses
}