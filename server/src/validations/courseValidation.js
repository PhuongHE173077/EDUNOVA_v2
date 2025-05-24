import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import ApiError from "~/utils/ApiError"
import { TYPE_QUESTION } from "~/utils/constants"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators"

const create = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required(),
        lecturerId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
        subjectId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
        semesterId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
    })
    try {
        await schema.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
}

export const courseValidation = {
    create
}