import { StatusCodes } from "http-status-codes"
import { ObjectId } from "mongodb"
import { questionLessonModel } from "~/models/questionLessonModel"
import { questionLessonService } from "~/services/questionLessonService"

const getQuestionByLessonId = async (req, res, next) => {
    try {
        const { lessonId } = req.query
        const question = await questionLessonService.getQuestionByLessonId(lessonId)
        res.status(StatusCodes.OK).json(question)
    } catch (error) {
        next(error)
    }
}

const getQuestionById = async (req, res, next) => {
    try {
        const question = await questionLessonService.getQuestionById(req.params.id)
        res.status(StatusCodes.OK).json(question)
    } catch (error) {
        next(error)
    }
}

const createQuestion = async (req, res, next) => {
    try {
        const newData = {
            lessonId: new ObjectId(req.body.lessonId),
            urlFile: req.body.urlFile ? req.body.urlFile : '',
            timeStart: new Date(req.body.timeStart),
            timeEnd: new Date(req.body.timeEnd),
            status: req.body.status,
            type: req.body.type,
            description: req.body.description,
            title: req.body.title
        }
        const question = await questionLessonModel.createNew(newData)
        res.status(StatusCodes.CREATED).json(question)
    } catch (error) {
        next(error)
    }
}


export const questionLessonController = {
    getQuestionByLessonId,
    getQuestionById,
    createQuestion
}