
const { ObjectId } = require("mongodb")
const { GET_DB } = require("~/config/mongodb")


const USER_COLLECTION_NAME = 'users'


const INVALID_UPDATE_FILEDS = ['_id', 'email', 'username', 'createdAt']


const findOneByEmail = async (email) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ email: email })


  } catch (error) {
    throw new Error(error)
  }
}


const findOneById = async (id) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne({ _id: ObjectId(id) })
  } catch (error) {
    throw new Error(error)
  }
}


const createNew = async (data) => {
  try {

    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}


const updateUser = async (userId, data) => {
  try {
    Object.keys(data).forEach((fieldName) => {
      if (INVALID_UPDATE_FILEDS.includes(fieldName)) {
        delete data[fieldName]
      }
    })

    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate(
      { _id: ObjectId(userId) },
      { $set: data },
      { returnDocument: 'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}
export const userModal = {
  USER_COLLECTION_NAME,
  findOneByEmail,
  findOneById,
  createNew,
  updateUser
}
