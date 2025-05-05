import { questionLessonModel } from "./questionLessonModel"

const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const LESSON_COLLECTION_NAME = 'lessons'


const INVALID_UPDATE_FILEDS = ['_id', 'email', 'username', 'createdAt']


const findOneById = async (id) => {
    try {
        return await GET_DB().collection(LESSON_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error(error)
    }
}


const createNew = async (data) => {
    try {
        return await GET_DB().collection(LESSON_COLLECTION_NAME).insertOne(validData)
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

        const result = await GET_DB().collection(LESSON_COLLECTION_NAME).findOneAndUpdate(
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
        const result = await GET_DB().collection(LESSON_COLLECTION_NAME).find({}).toArray()

        return result

    } catch (error) {
        throw error
    }
}

const getLessonByCourseId = async (courseId) => {
    try {
        const result = await GET_DB().collection(LESSON_COLLECTION_NAME).aggregate([
            { $match: { courseId: new ObjectId(courseId) } },
            {
                $lookup: {
                    from: questionLessonModel.Q_LESSON_COLLECTION_NAME,
                    localField: '_id',
                    foreignField: 'lessonId',
                    as: 'questions'
                }
            }

        ]).toArray()
        return result
    } catch (error) {
        throw error
    }
}

export const lessonModel = {
    LESSON_COLLECTION_NAME,
    findOneById,
    createNew,
    update,
    getAll,
    getLessonByCourseId
}
