import { StatusCodes } from "http-status-codes"
import { cloudinaryProvider } from "~/providers/CloudinaryProvider"

const uploadImage = async (req, res, next) => {
    try {
        const imageCoverFile = req.file
        const resultUpload = await cloudinaryProvider.streamUpload(imageCoverFile.buffer, 'EduNova')
        res.status(StatusCodes.OK).json(resultUpload.secure_url)
    } catch (error) {
        next(error)
    }
}

export const imageController = { uploadImage }