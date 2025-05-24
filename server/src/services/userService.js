import { StatusCodes } from "http-status-codes"
import { userModal } from "~/models/userModal"
import ApiError from "~/utils/ApiError"
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid';
import { pickUser } from "~/utils/slugify";
import { sendEmail } from "~/utils/sendMail";
import { USER_ROLE, WEBSITE_DOMAIN } from "~/utils/constants";

import { JwtProvider } from "~/providers/JwtProvider";
import { env } from "~/config/environment";
import { cloudinaryProvider } from "~/providers/CloudinaryProvider";
import { FormMail } from "~/utils/fommat";
import { generatePassword } from "~/utils/algorithms";
const createNew = async (req) => {
  try {
    // Kiểm tra email đã tồn tại chưa
    const userExits = await userModal.findOneByEmail(req.body.email);
    if (userExits) {
      throw new ApiError(StatusCodes.CONFLICT, 'Email exits');
    }

    const formName = req.body.email.split('@')[0].toLowerCase();

    // Tạo mật khẩu tự động
    const password = generatePassword();

    const newUser = {
      email: req.body.email,
      password: bcrypt.hashSync(password, 8),
      username: req.body.username || formName,
      displayName: req.body.displayName || formName,
      role: req.body.role || USER_ROLE.CLIENT,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true,
      verifyToken: uuidv4(),
    };

    // Thêm user mới vào DB
    const createUser = await userModal.createNew(newUser);

    // Lấy lại user vừa tạo để có đầy đủ trường (bao gồm _id)
    const getNewUser = await userModal.findOneById(createUser.insertedId);

    // Gửi email mật khẩu
    const linkVerify = `${WEBSITE_DOMAIN}/account/reset-password?email=${req.body.email}&token=${getNewUser.verifyToken}`;
    await sendEmail('EDUNOVA', req.body.email, 'Account Verification', FormMail('EDUNOVA', req.body.email, linkVerify, password));

    // Trả về user lấy từ DB
    return pickUser(getNewUser);
  } catch (error) {
    throw new Error(error);
  }
}


const verifyAccount = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    //check email exits
    const userExits = await userModal.findOneByEmail(data.email)

    if (!userExits) throw new ApiError(StatusCodes.NOT_FOUND, 'Email not exits!')

    if (userExits.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'this account has been activated!')

    //check token valid
    if (data.token !== userExits.verifyToken) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'Token is invalid!')

    //if don't have error, update isActive to true
    const updateData = {
      isActive: true,
      verifyToken: null
    }

    const updatedUser = await userModal.updateUser(userExits._id, updateData)

    return pickUser(updatedUser)
  } catch (error) {
    throw error
  }
}


const login = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const userExits = await userModal.findOneByEmail(data.email)

    if (!userExits) throw new ApiError(StatusCodes.NOT_FOUND, 'Email not exits!')

    if (!userExits.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'This account is not activated!')

    if (!bcrypt.compareSync(data.password, userExits.password)) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'The email or password is incorrect!')

    /** if it don't have error, create token return frontend */
    //create user info in jwt token
    const userInfo = { _id: userExits._id, email: userExits.email, role: userExits.role }

    // create access token and fresh token

    const accessToken = await JwtProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      // 5
      env.ACCESS_TOKEN_LIFE
    )


    const refreshToken = await JwtProvider.generateToken(
      userInfo,
      env.REFRESH_TOKEN_SECRET_SIGNATURE,
      // '1h'
      env.REFRESH_TOKEN_LIFE
    )


    return {
      accessToken,
      refreshToken,
      ...pickUser(userExits)
    }
  } catch (error) {
    throw error
  }
}


const refreshToken = async (data) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const refreshTokenDecoded = await JwtProvider.verifyToken(data, env.REFRESH_TOKEN_SECRET_SIGNATURE)
    const userInfo = {
      _id: refreshTokenDecoded._id,
      email: refreshTokenDecoded.email
    }
    const accessToken = await JwtProvider.generateToken(
      userInfo,
      env.ACCESS_TOKEN_SECRET_SIGNATURE,
      env.ACCESS_TOKEN_LIFE
    )


    return {
      accessToken
    }
  } catch (error) {
    throw error
  }
}


const update = async (userId, data, userAvataFile) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const exitsUser = await userModal.findOneById(userId)

    if (!exitsUser) throw new ApiError(StatusCodes.NOT_FOUND, 'User not found!')

    // Bỏ đoạn kiểm tra này vì nó chặn update khi user inactive
    // if (!exitsUser.isActive) throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'This account is not activated!')

    let updatedUser

    if (data.currentPassword && data.newPassword) {
      if (!bcrypt.compareSync(data.currentPassword, exitsUser.password))
        throw new ApiError(StatusCodes.NOT_ACCEPTABLE, 'The current password is incorrect!')

      updatedUser = await userModal.updateUser(exitsUser._id, {
        password: bcrypt.hashSync(data.newPassword, 8)
      })
    } else if (userAvataFile) {
      // upload file to cloudinary
      const resultUpload = await cloudinaryProvider.streamUpload(userAvataFile.buffer, 'users')

      // save url of file to db
      updatedUser = await userModal.updateUser(exitsUser._id, { avatar: resultUpload.secure_url })
    } else {
      updatedUser = await userModal.updateUser(exitsUser._id, data)
    }

    return pickUser(updatedUser)
  } catch (error) {
    throw error
  }
}


const getAllUser = async () => {
  try {
    const result = await userModal.getAllUser();
    // Sửa filter đúng role đang dùng
    return result.filter(user => user.role === "student" || user.role === "lecturer");
  } catch (error) {
    throw error;
  }
}


const deleteUser = async (userId) => {
  try {

    const result = await userModal.deleteUser(userId)
    return result
  } catch (error) {
    throw error
  }
}


export const userService = {
  createNew,
  login,
  verifyAccount,
  refreshToken,
  update,
  getAllUser,
  deleteUser
}
