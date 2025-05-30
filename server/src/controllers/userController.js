import { StatusCodes } from "http-status-codes"
import ms from "ms"
import { userService } from "~/services/userService"
import ApiError from "~/utils/ApiError"


const createNew = async (req, res, next) => {
  try {
    const createBoard = await userService.createNew(req)


    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}
const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body)


    //handle cookie
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSize: 'none',
      maxAge: ms('14 days')
    })


    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSize: 'none',
      maxAge: ms('14 days')
    })
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}
const verifyAccount = async (req, res, next) => {
  try {
    const result = await userService.verifyAccount(req.body)


    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}


const logout = async (req, res, next) => {
  try {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')


    res.status(StatusCodes.OK).json({ loggedOut: true })
  } catch (error) {
    next(error)
  }
}


const refreshToken = async (req, res, next) => {
  try {


    const result = await userService.refreshToken(req.cookies?.refreshToken)
    res.cookie('accessToken', result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSize: 'none',
      maxAge: ms('14 days')
    })
    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(new ApiError(StatusCodes.UNAUTHORIZED, 'plece login again'))
  }
}


const update = async (req, res, next) => {
  try {
    const userId = req.jwtDecoded._id
    const userAvataFile = req.file


    const result = await userService.update(userId, req.body, userAvataFile)


    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}
const getAllUser = async (req, res, next) => {
  try {
    const result = await userService.getAllUser()

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}
export const userController = {
  createNew,
  login,
  verifyAccount,
  logout,
  refreshToken,
  update,
  getAllUser
}
