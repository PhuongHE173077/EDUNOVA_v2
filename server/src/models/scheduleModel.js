import { userModal } from "./userModal"

const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const COLLECTION_NAME = 'schedules'


const INVALID_UPDATE_FILEDS = ['_id', 'createdAt']


const findOneById = async (id) => {
    try {
        return await GET_DB().collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error(error)
    }
}


const createNew = async (data) => {
    try {
        return await GET_DB().collection(COLLECTION_NAME).insertOne(validData)
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

        const result = await GET_DB().collection(COLLECTION_NAME).findOneAndUpdate(
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
        const result = await GET_DB().collection(COLLECTION_NAME).find({}).toArray()

        return result

    } catch (error) {
        throw error
    }
}

const getScheduleByLectureId = async (userId) => {
    try {
        const result = await GET_DB().collection(COLLECTION_NAME).find({ lectureId: new ObjectId(userId) }).toArray()
        return result
    } catch (error) {
        throw error
    }
}

const getScheduleByCourseId = async (courseIds) => {
    try {
        const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
            { $match: { courseId: { $in: courseIds } } },
            {
                $lookup: {
                    from: userModal.USER_COLLECTION_NAME,
                    localField: 'lectureId',
                    foreignField: '_id',
                    as: 'lecture'
                }
            },
        ]).toArray()
        return result
    } catch (error) {
        throw error
    }
}
export const scheduleModel = {
    COLLECTION_NAME,
    findOneById,
    createNew,
    update,
    getAll,
    getScheduleByLectureId,
    getScheduleByCourseId
}
