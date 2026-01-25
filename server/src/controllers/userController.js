import { StatusCodes } from "http-status-codes"
import ms from "ms"
import { userModal } from "~/models/userModal"
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
      sameSite: 'none',
      maxAge: ms('14 days')
    })


    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
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
    const userId = req.params.id; // <-- lấy đúng userId cần update
    const userAvataFile = req.file;

    if (!userId) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "User ID is required");
    }

    const result = await userService.update(userId, req.body, userAvataFile);

    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

const getAllUser = async (req, res, next) => {
  try {
    const result = await userService.getAllUser()

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}


const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id
    const result = await userService.deleteUser(userId)

    res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }

}
const getLecturers = async (req, res, next) => {
  try {
    const lecturers = await userService.getLecturers();
    res.status(200).json(lecturers);
  } catch (error) {
    next(error);
  }
};

const addManyUsers = async (req, res, next) => {
  try {
    const users = req.body;
    const newUsers = users.map(user => ({
      ...user,
      password: "$2b$08$XA9sRRp27MeVMWXqYwTw7e2LU8lhtPvJYUGE61okCBNWFSUkJidRq",
      role: "student",
      avatar: "",
      isActive: true,
      verificationCode: "e5781ced-a33b-44b9-b43c-87d591a3500d",
      verificationCodeExpired: new Date("2025-04-02T16:56:02.780Z"),
      _destroy: false,
      username: user.email.split('@')[0],
      createdAt: new Date("2025-04-02T16:56:02.780Z"),
      updatedAt: new Date("2025-06-11T14:51:13.813Z")
    }));

    const result = await userModal.addManyUsers(newUsers);
    res.status(201).json(result);
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
  getAllUser,
  deleteUser,
  getLecturers,
  addManyUsers
}
