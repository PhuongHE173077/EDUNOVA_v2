import { pickUser } from "~/utils/slugify"

const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const COLLECTION_NAME = 'answerLessons'


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


const findAnswersByQuestionId = async (questionId, page, itemsPerPage) => {

    try {

        const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
            { $match: { questionId: new ObjectId(questionId) } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            { $sort: { answerAt: -1 } },
            {
                $facet: {
                    'queryItems': [
                        { $skip: (page - 1) * itemsPerPage },
                        { $limit: itemsPerPage }
                    ],

                    'count': [{ $count: 'totalBoards' }]
                }
            }

        ]).toArray()
        const data = result[0].queryItems.map((answer) => {
            return {
                ...answer,
                user: pickUser(answer.user[0])
            }
        })
        return {
            answers: data,
            totalAnswers: result[0]?.count[0]?.totalBoards || 0
        }
    } catch (error) {
        throw error
    }
}

export const answerLessonModel = {
    COLLECTION_NAME,
    findOneById,
    createNew,
    update,
    getAll,
    findAnswersByQuestionId

}
