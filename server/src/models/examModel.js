import { pickUser } from "~/utils/slugify"
import { questionExamModel } from "./questionExamModel"

const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const COLLECTION_NAME = 'exams'


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

const getExamsByCourseId = async (courseId) => {
    try {

        const result = await GET_DB().collection(COLLECTION_NAME).find({ courseId: new ObjectId(courseId) }).toArray()

        return result

    } catch (error) {
        throw error
    }
}

const getExamDetail = async (examId) => {
    try {

        const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
            { $match: { _id: new ObjectId(examId) } },
            {
                $lookup: {
                    from: questionExamModel.COLLECTION_NAME,
                    localField: '_id',
                    foreignField: 'examId',
                    as: 'questions'
                }
            },

        ]).toArray()

        const data = {
            ...result[0],
            questions: result[0].questions.map((question) => {
                return {
                    ...question,
                    options: question.options.map((option) => {
                        return {
                            id: option.id,
                            content: option.content,

                        }
                    }),
                    numberCorrectAnswer: question.options.filter((option) => option.isCorrect).length
                }
            })
        }
        return data

    } catch (error) {
        throw error
    }
}
const getExamDetailHasAnswer = async (examId) => {
    try {

        const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
            { $match: { _id: new ObjectId(examId) } },
            {
                $lookup: {
                    from: questionExamModel.COLLECTION_NAME,
                    localField: '_id',
                    foreignField: 'examId',
                    as: 'questions'
                }
            },

        ]).toArray()

        const data = {
            ...result[0],
            questions: result[0].questions.map((question) => {
                return {
                    ...question,
                    options: question.options,
                    numberCorrectAnswer: question.options.filter((option) => option.isCorrect).length
                }
            })
        }
        return data

    } catch (error) {
        throw error
    }
}




export const examModel = {
    COLLECTION_NAME,
    findOneById,
    createNew,
    update,
    getAll,
    getExamsByCourseId,
    getExamDetail,
    getExamDetailHasAnswer
}
