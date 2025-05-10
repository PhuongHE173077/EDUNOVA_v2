import { ObjectId } from "mongodb"
import { examModel } from "~/models/examModel"
import { questionExamModel } from "~/models/questionExamModel"

const createNew = async (data, courseId) => {
    try {
        const dataExam = {
            title: data.title,
            time: data.time,
            imageCover: data.imageCover,
            date: new Date(data.date) || Date.now(),
            viewAnswer: data.viewAnswer,
            courseId: new ObjectId(courseId)
        }

        const newExam = await examModel.createNew(dataExam)
        const dataQuestions = data.questions.map((question) => {
            return {
                ...question,
                examId: newExam.insertedId
            }
        })
        const newQuestion = await questionExamModel.createMany(dataQuestions)
        return {
            mess: 'success',
            data: {
                newExam,
                newQuestion
            }
        }
    } catch (error) {
        throw error
    }
}

export const examService = {
    createNew
}