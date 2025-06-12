import { userModal } from "./userModal"

const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const COLLECTION_NAME = 'records'


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
        return await GET_DB().collection(COLLECTION_NAME).insertOne(data)
    } catch (error) {
        throw new Error(error)
    }
}

const createMany = async (data) => {
    try {
        return await GET_DB().collection(COLLECTION_NAME).insertMany(data)
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

const getByLectureId = async (lecturerId) => {
    try {
        const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
            { $match: { lecturerId: new ObjectId(lecturerId) } },
            {
                $lookup: {
                    from: userModal.USER_COLLECTION_NAME,
                    localField: 'lectureId',
                    foreignField: '_id',
                    as: 'lecture'
                }
            },

        ]).toArray()

        return result.map((record) => {
            return {
                ...record,
                lecture: record.lecture[0]
            }
        })

    } catch (error) {
        throw error
    }
}




export const recordModel = {
    COLLECTION_NAME,
    findOneById,
    createNew,
    update,
    getAll,
    createMany,
    getByLectureId
}
