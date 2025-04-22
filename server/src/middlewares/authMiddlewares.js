import { StatusCodes } from "http-status-codes"
import { env } from "~/config/environment"
import { JwtProvider } from "~/providers/JwtProvider"
import ApiError from "~/utils/ApiError"

//Middleware ensure user is authorized: authenticate jwt accessToken recived from frontend is correct or not
const isAuthorized = (roles = []) => {
  return async (req, res, next) => {
    //get accessToken from cookie
    const clientToken = req.cookies?.accessToken


    if (!clientToken) {
      next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized(Token not found)'))
    }
    try {
      //verify token
      const accessTokenDecoded = await JwtProvider.verifyToken(clientToken, env.ACCESS_TOKEN_SECRET_SIGNATURE)


      if (roles.length && !roles.includes(accessTokenDecoded.role)) {
        next(new ApiError(StatusCodes.FORBIDDEN, 'The user does not have permission to access'))
        return
      }

      //if token is valid , save token to req to use later
      req.jwtDecoded = accessTokenDecoded

      //allow next
      next()
    } catch (error) {
      //if accesToken is expired(hết hạn) return error 410 for FE to call api refeshToken
      if (error?.message?.includes('jwt expired')) {
        next(new ApiError(StatusCodes.GONE, 'Token is expired!'))
        return
      } else if (error?.message?.includes('FORBIDDEN')) {
        next(new ApiError(StatusCodes.GONE, 'Token is expired!'))
        return
      } else {
        next(new ApiError(StatusCodes.UNAUTHORIZED, 'Unauthorized'))
      }


    }

  }


}


export const authMiddlewares = {
  isAuthorized
}
