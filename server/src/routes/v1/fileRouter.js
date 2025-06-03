import express from 'express'
import { fileController } from '~/controllers/fileControllrer'
import { multerUploadMiddlewares } from '~/middlewares/multerUploadMiddlewares'


const Router = express.Router()

Router.route('/upload')
    .post(multerUploadMiddlewares.upload.single('file'), fileController.upload)

export const fileRouter = Router