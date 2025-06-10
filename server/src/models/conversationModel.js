import { pickUser } from "~/utils/slugify"
import { questionLessonModel } from "./questionLessonModel"
import { userModal } from "./userModal"
import { messageModel } from "./messageModel"

const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const COLLECTION_NAME = 'conversations'


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

const getByUserId = async (userId) => {
    try {

        const conditionQuery = [
            { _destroy: false },
            {
                $or: [
                    { owners: { $in: [new ObjectId(userId)] } },
                    { members: { $in: [new ObjectId(userId)] } }
                ]
            }
        ]

        const result = await GET_DB().collection(COLLECTION_NAME).aggregate([
            { $match: { $and: conditionQuery } },
            {
                $lookup: {
                    from: userModal.USER_COLLECTION_NAME,
                    localField: 'members',
                    foreignField: '_id',
                    as: 'members'
                }
            },
            {
                $lookup: {
                    from: userModal.USER_COLLECTION_NAME,
                    localField: 'owners',
                    foreignField: '_id',
                    as: 'owners'
                }
            },
            {
                $lookup: {
                    from: messageModel.COLLECTION_NAME,
                    localField: 'lastMessageId',
                    foreignField: '_id',
                    as: 'lastMessage'
                }

            },
            { $sort: { updatedAt: -1 } }
        ]).toArray()


        return result.map((conversation) => {
            return {
                ...conversation,
                members: conversation.members.map((member) => {
                    return pickUser(member)
                }),
                owners: conversation.owners.map((owner) => {
                    return pickUser(owner)
                }),
                lastMessage: conversation.lastMessage[0]
            }
        })

    } catch (error) {
        throw error
    }
}



export const conversationModel = {
    findOneById,
    createNew,
    update,
    getAll,
    getByUserId
}
