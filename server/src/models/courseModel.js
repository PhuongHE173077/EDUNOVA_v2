import { deleteFields } from "~/utils/algorithms"
import { semesterModel } from "./semesterModel"
import { subjectModel } from "./subjectModel"
import { userModal } from "./userModal"
import { pickUser } from "~/utils/slugify"

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
                lecturer: course.lecturer.length > 0 ? pickUser(course.lecturer[0]) : null,
                student: course.student || [],
                semester: course.semester.length > 0 ? course.semester[0] : null,
                subject: course.subject.length > 0 ? course.subject[0] : null,
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
        return await GET_DB().collection(COURSE_COLLECTION_NAME).insertOne(data)
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (id, data) => {
    try {
      console.log("[Model] update - id:", id);
      console.log("[Model] update - data before filtering:", data);
  
      Object.keys(data).forEach((fieldName) => {
        if (INVALID_UPDATE_FILEDS.includes(fieldName)) {
          delete data[fieldName];
        }
      });
  
      console.log("[Model] update - data after filtering:", data);
  
      const result = await GET_DB().collection(COURSE_COLLECTION_NAME).findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: data },
        { returnDocument: "after" }
      );
  
      console.log("[Model] update - MongoDB result:", result);
  
      return result.value;
    } catch (error) {
      console.error("[Model] update - error:", error);
      throw error;
    }
  };
  

const getAll = async () => {
    try {
        const result = await GET_DB().collection(COURSE_COLLECTION_NAME).aggregate([
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
                lecturer: course.lecturer.length > 0 ? pickUser(course.lecturer[0]) : null,
                student: course.student || [],
                semester: course.semester.length > 0 ? course.semester[0] : null,
                subject: course.subject.length > 0 ? course.subject[0] : null,
            }
        })

        const fieldName = [
            'lecturerId',
            'studentIds',
            'semesterId',
            'subjectId'
        ]
        const result2 = data.map(course => deleteFields(course, fieldName))

        return result2
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
                lecturer: course.lecturer.length > 0 ? pickUser(course.lecturer[0]) : null,
                student: course.student || [],
                semester: course.semester.length > 0 ? course.semester[0] : null,
                subject: course.subject.length > 0 ? course.subject[0] : null,
            }
        })

        const fieldName = [
            'lecturerId',
            'studentIds',
            'semesterId',
            'subjectId'
        ]
        const result2 = data.map(course => deleteFields(course, fieldName))

        return result2
    } catch (error) {
        throw error
    }
}

const getCourseBySemesterId = async (semesterId) => {
  try {
    const result = await GET_DB().collection(COURSE_COLLECTION_NAME).aggregate([
      { $match: { semesterId: new ObjectId(semesterId) } },
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

    const data = result.map(course => ({
      ...course,
      lecturer: course.lecturer.length > 0 ? pickUser(course.lecturer[0]) : null,
      student: course.student || [],
      semester: course.semester.length > 0 ? course.semester[0] : null,
      subject: course.subject.length > 0 ? course.subject[0] : null,
    }))

    const fieldName = ['lecturerId', 'studentIds', 'semesterId', 'subjectId']

    return data.map(course => deleteFields(course, fieldName))
  } catch (error) {
    throw error
  }
}

const getCourseBySemesterIdAndSubjectId = async (semesterId, subjectId) => {
  try {
    const result = await GET_DB().collection(COURSE_COLLECTION_NAME).aggregate([
      { $match: { semesterId: new ObjectId(semesterId), subjectId: new ObjectId(subjectId) } },
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

    const data = result.map(course => ({
      ...course,
      lecturer: course.lecturer.length > 0 ? pickUser(course.lecturer[0]) : null,
      student: course.student || [],
      semester: course.semester.length > 0 ? course.semester[0] : null,
      subject: course.subject.length > 0 ? course.subject[0] : null,
    }))

    const fieldName = ['lecturerId', 'studentIds', 'semesterId', 'subjectId']

    return data.map(course => deleteFields(course, fieldName))
  } catch (error) {
    throw error
  }
}

const deleteById = async (courseId) => {
    try {
        return await GET_DB().collection(COURSE_COLLECTION_NAME).deleteOne({ _id: new ObjectId(courseId) })
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
    getCourseByUserId,
    getCourseBySemesterId,
    getCourseBySemesterIdAndSubjectId,
    deleteById
}
