import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { courseModel } from "~/models/courseModel"
import { lessonModel } from "~/models/lessonModel"
import { subjectModel } from "~/models/subjectModel"
import { courseService } from "~/services/courseService"
import { COURSE_STATUS } from "~/utils/constants"

const getCourseByUserId = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const semesterId = req.query.semesterId
        const subjectId = req.query.subjectId
        let result
        if (semesterId && subjectId) {
            result = await courseService.getCourseBySemesterIdAndSubjectId(semesterId, subjectId)
        }
        if (semesterId) {
            result = await courseService.getCourseBySemesterId(semesterId)
        }

        else {
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
        const courseId = req.params.id;
        const data = req.body;
        let result
        if (data.studentIds) {
            const dataNew = data.studentIds.map((id) => {
                return new ObjectId(id);
            });
            data.studentIds = dataNew;

            result = await courseService.updateCourse(courseId, data);
        } else {
            if (data.lecturerId) data.lecturerId = new ObjectId(data.lecturerId);
            if (data.subjectId) data.subjectId = new ObjectId(data.subjectId);
            if (data.semesterId) data.semesterId = new ObjectId(data.semesterId);


            if (data.startDate) data.startDate = new Date(data.startDate);
            if (data.endDate) data.endDate = new Date(data.endDate);

            result = await courseService.updateCourse(courseId, data);
        }




        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};



const createCourse = async (req, res, next) => {
    try {

        const Courses = await courseModel.getCourseBySemesterId(req.body.semesterId)
        const Subjects = await subjectModel.findOneById(req.body.subjectId)

        // Lấy id theo mã môn và số môn lượng môn trong kì học
        const data = {
            ...req.body,
            id: `${Subjects.id}-${Courses.length + 1 < 10 ? `0${Courses.length + 1}` : `${Courses.length + 1}`}`,
            lecturerId: new ObjectId(req.body.lecturerId),
            semesterId: new ObjectId(req.body.semesterId),
            studentIds: [],
            subjectId: new ObjectId(req.body.subjectId),
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            status: COURSE_STATUS.PENDING
        }

        const result = await courseService.createCourse(data)

        const newLesson = Subjects.curriculums.map(item => ({
            title: item.title,
            courseId: result.insertedId,
            content: item.content,
            status: true
        }))

        // Tạo lesson cho khóa học
        const createLesson = await lessonModel.createMany(newLesson)

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
const getLecturers = async (req, res, next) => {
    try {
        const lecturers = await userModel.getLecturers();
        res.status(200).json(lecturers);
    } catch (error) {
        next(error);
    }
};
export const courseController = {
    getCourseByUserId,
    getCourseById,
    updateCourse,
    createCourse,
    deleteCourse,
    getAllCourses,
    getLecturers
}