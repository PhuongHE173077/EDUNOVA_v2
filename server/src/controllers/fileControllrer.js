import { StatusCodes } from "http-status-codes"
import { fileMiddleware } from "~/middlewares/fileMiddleware"

const upload = async (req, res, next) => {
    try {
        const file = req.file
        const resultUpload = await fileMiddleware.uploadFile(file.buffer, file.originalname)
        res.status(StatusCodes.OK).json(resultUpload)
    } catch (error) {
        next(error)
    }
}

export const fileController = { upload }