import express from 'express'
import { userController } from '~/controllers/userController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { multerUploadMiddlewares } from '~/middlewares/multerUploadMiddlewares'
import { userValidation } from '~/validations/userValidation'


const Router = express.Router()


Router.route('/register')
  .post(userValidation.createNew, userController.createNew)


Router.route('/verify')
  .put(userValidation.verifyAccount, userController.verifyAccount)


Router.route('/login')
  .post(userValidation.login, userController.login)


Router.route('/logout')
  .delete(userController.logout)


Router.route('/refresh_token')
  .get(userController.refreshToken)

Router.route('/users/list')
  .get(authMiddlewares.isAuthorized, userController.getAllUser)


Router.route('/update')
  .put(
    authMiddlewares.isAuthorized,
    multerUploadMiddlewares.upload.single('avatar'),
    userValidation.update,
    userController.update)
export const userRoutes = Router
