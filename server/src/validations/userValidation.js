import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import ApiError from "~/utils/ApiError"
import { USER_ROLE } from "~/utils/constants"
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, PASSWORD_RULE, PASSWORD_RULE_MESSAGE } from "~/utils/validators"


const createNew = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),

    role: Joi.string().valid(USER_ROLE.STUDENT, USER_ROLE.TEACHER).default(USER_ROLE.STUDENT).required(),
  })


  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}




const verifyAccount = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
    token: Joi.string().required()
  })


  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}


const login = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE).required(),
    password: Joi.string().pattern(PASSWORD_RULE).message(PASSWORD_RULE_MESSAGE).required()
  })


  try {
    await schema.validateAsync(req.body, { abortEarly: false })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}


const update = async (req, res, next) => {
  const schema = Joi.object({
    displayName: Joi.string().trim().strict(),
    bio: Joi.string().trim().strict(),
    currentPassword: Joi.string().pattern(PASSWORD_RULE).message(`Current password:${PASSWORD_RULE_MESSAGE}`),
    newPassword: Joi.string().pattern(PASSWORD_RULE).message(`New password:${PASSWORD_RULE_MESSAGE}`)
  })


  try {
    await schema.validateAsync(req.body, { abortEarly: false, allowUnknown: true })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

export const userValidation = {
  createNew,
  login,
  verifyAccount,
  update
}
