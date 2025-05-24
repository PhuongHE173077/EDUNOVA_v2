import express from 'express'
import { userController } from '~/controllers/userController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'
import { multerUploadMiddlewares } from '~/middlewares/multerUploadMiddlewares'
import { userValidation } from '~/validations/userValidation'


const Router = express.Router()

Router.route('/user/:id')
  .delete(authMiddlewares.isAuthorized, userController.deleteUser)
Router.route('/register')
  .post(userController.createNew)


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


  Router.route('/user/:id')
  .put(
    authMiddlewares.isAuthorized,
    multerUploadMiddlewares.upload.single('avatar'),
    userValidation.update,
    userController.update
  );
  Router.route('/users/lecturers')
  .get(authMiddlewares.isAuthorized, userController.getLecturers);

export const userRoutes = Router
