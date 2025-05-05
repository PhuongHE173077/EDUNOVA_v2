import { deleteFields } from "~/utils/algorithms"
import { semesterModel } from "./semesterModel"
import { subjectModel } from "./subjectModel"
import { userModal } from "./userModal"

const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const COURSE_COLLECTION_NAME = 'courses'


const INVALID_UPDATE_FILEDS = ['_id', 'email', 'username', 'createdAt']


const findOneById = async (id) => {

    try {
        const result = await GET_DB().collection(COURSE_COLLECTION_NAME).aggregate([
            { $match: { _id: new ObjectId(id) } },
            {
                $lookup: {
                    from: userModal.USER_COLLECTION_NAME,
                    localField: 'lecturerId',
                    foreignField: '_id',
                    as: 'lecturer'
                }
            },
            {
                $lookup: {
                    from: userModal.USER_COLLECTION_NAME,
                    localField: 'studentIds',
                    foreignField: '_id',
                    as: 'student'
                }
            },
            {
                $lookup: {
                    from: semesterModel.SEMESTER_COLLECTION_NAME,
                    localField: 'semesterId',
                    foreignField: '_id',
                    as: 'semester'
                }
            },
            {
                $lookup: {
                    from: subjectModel.SUBJECT_COLLECTION_NAME,
                    localField: 'subjectId',
                    foreignField: '_id',
                    as: 'subject'
                }
            }
        ]).toArray()

        const data = result.map((course) => {
            return {
                ...course,
                lecturer: course.lecturer[0],
                student: course.student.map((student) => student),
                semester: course.semester[0],
                subject: course.subject[0]
            }
        })

        const fieldName = [
            'lecturerId',
            'studentIds',
            'semesterId',
            'subjectId'
        ]

        const result2 = data.map((course) => {
            return deleteFields(course, fieldName)
        })

        return result2[0] || null
    } catch (error) {
        throw new Error(error)
    }
}


const createNew = async (data) => {
    try {
        return await GET_DB().collection(COURSE_COLLECTION_NAME).insertOne(validData)
    } catch (error) {
        throw new Error(error)
    }
}


const update = async (id, data) => {
    try {
        Object.keys(data).forEach((fieldName) => {
            if (INVALID_UPDATE_FILEDS.includes(fieldName)) {
                delete data[fieldName]
            }
        })

        const result = await GET_DB().collection(COURSE_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: 'after' }
        )
        return result.value
    } catch (error) {
        throw new Error(error)
    }
}


const getAll = async () => {
    try {
        const result = await GET_DB().collection(COURSE_COLLECTION_NAME).find({}).toArray()
        return result
    } catch (error) {
        throw error
    }
}

const getCourseByUserId = async (userId) => {
    try {

        const conditionQuery = {
            $or: [
                { studentIds: { $all: [new ObjectId(userId)] } },
                { lecturerId: new ObjectId(userId) }
            ]
        }

        const result = await GET_DB().collection(COURSE_COLLECTION_NAME).aggregate([
            { $match: conditionQuery },
            {
                $lookup: {
                    from: userModal.USER_COLLECTION_NAME,
                    localField: 'lecturerId',
                    foreignField: '_id',
                    as: 'lecturer'
                }
            },
            {
                $lookup: {
                    from: userModal.USER_COLLECTION_NAME,
                    localField: 'studentIds',
                    foreignField: '_id',
                    as: 'student'
                }
            },
            {
                $lookup: {
                    from: semesterModel.SEMESTER_COLLECTION_NAME,
                    localField: 'semesterId',
                    foreignField: '_id',
                    as: 'semester'
                }
            },
            {
                $lookup: {
                    from: subjectModel.SUBJECT_COLLECTION_NAME,
                    localField: 'subjectId',
                    foreignField: '_id',
                    as: 'subject'
                }
            }
        ]).toArray()

        const data = result.map((course) => {
            return {
                ...course,
                lecturer: course.lecturer[0],
                student: course.student.map((student) => student),
                semester: course.semester[0],
                subject: course.subject[0]
            }
        })

        const fieldName = [
            'lecturerId',
            'studentIds',
            'semesterId',
            'subjectId'
        ]
        const result2 = deleteFields(data, fieldName)

        return result2
    } catch (error) {
        throw error
    }
}


export const courseModel = {
    COURSE_COLLECTION_NAME,
    findOneById,
    createNew,
    update,
    getAll,
    getCourseByUserId
}
