import { pickUser } from "~/utils/slugify"

const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const COLLECTION_NAME = 'questionBanks'


const INVALID_UPDATE_FILEDS = ['_id', 'email', 'username', 'createdAt']


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

const getByUserId = async (userId) => {
    try {
        const result = await GET_DB().collection(COLLECTION_NAME).find({ userId: new ObjectId(userId) }).toArray()

        return result

    } catch (error) {
        throw error
    }
}



export const questionBankModel = {
    COLLECTION_NAME,
    findOneById,
    createNew,
    update,
    getAll,
    createMany,
    getByUserId
}
