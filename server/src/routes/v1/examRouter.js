import express from 'express'
import { examController } from '~/controllers/examController'



const Router = express.Router()


Router.route('/:courseId')
    .post(examController.createNew)

export const examRouter = Router