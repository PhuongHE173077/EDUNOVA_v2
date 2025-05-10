import express from 'express'
import { imageController } from '~/controllers/imageController'
import { multerUploadMiddlewares } from '~/middlewares/multerUploadMiddlewares'


const Router = express.Router()

Router.route('/upload')
    .post(multerUploadMiddlewares.upload.single('image'), imageController.uploadImage)

export const imageRouter = Router