
const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const Q_LESSON_COLLECTION_NAME = 'questionLessons'


const INVALID_UPDATE_FILEDS = ['_id', 'email', 'username', 'createdAt']


const findOneById = async (id) => {
    try {
        return await GET_DB().collection(Q_LESSON_COLLECTION_NAME).findOne({ _id: new ObjectId(id) })
    } catch (error) {
        throw new Error(error)
    }
}


const createNew = async (data) => {
    try {
        return await GET_DB().collection(Q_LESSON_COLLECTION_NAME).insertOne(validData)
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

        const result = await GET_DB().collection(Q_LESSON_COLLECTION_NAME).findOneAndUpdate(
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
        const result = await GET_DB().collection(Q_LESSON_COLLECTION_NAME).find({}).toArray()

        return result

    } catch (error) {
        throw error
    }
}

const getQuestionByLessonId = async (id) => {
    try {
        const result = await GET_DB().collection(Q_LESSON_COLLECTION_NAME).find({ lessonId: new ObjectId(id) }).toArray()
        return result
    } catch (error) {
        throw error
    }
}


export const questionLessonModel = {
    Q_LESSON_COLLECTION_NAME,
    findOneById,
    createNew,
    update,
    getAll,
    getQuestionByLessonId
}
