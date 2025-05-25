import express from 'express'
import { semesterController } from '~/controllers/semesterController'
import { authMiddlewares } from '~/middlewares/authMiddlewares'


const Router = express.Router()

Router.route('/')
  .get(authMiddlewares.isAuthorized, semesterController.getAllSemesters)
  .post(authMiddlewares.isAuthorized, semesterController.createSemester);

// Lấy học kỳ theo user (có thể đổi đường dẫn cho rõ)
Router.route('/user_semesters')
  .get(authMiddlewares.isAuthorized, semesterController.getSemesterByUserId);

// Xóa học kỳ theo id
Router.route('/:id')
  .delete(authMiddlewares.isAuthorized, semesterController.deleteSemester)
  .put(authMiddlewares.isAuthorized, semesterController.updateSemester)

// Lấy học kỳ hiện tại
Router.route('/current')
  .get(authMiddlewares.isAuthorized, semesterController.getCurrentSemester);


export const semesterRouter = Router
