import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import ApiError from "~/utils/ApiError"
import { TYPE_QUESTION } from "~/utils/constants"
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators"

const create = async (req, res, next) => {
    const schema = Joi.object({
        answer: Joi.string().required(),
        questionId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).required(),
        type: Joi.valid(TYPE_QUESTION.ASSIGNMENT, TYPE_QUESTION.QUESTION).required(),
    })
    try {
        await schema.validateAsync(req.body, { abortEarly: false })
        next()
    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
    }
}

export const answerLessonValidation = {
    create
}