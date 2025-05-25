import { StatusCodes } from "http-status-codes"
import { semesterService } from "~/services/semesterService"

const getSemesterByUserId = async (req, res, next) => {
    try {
        const userId = req.jwtDecoded._id

        const result = await semesterService.getSemesterByUserId(userId)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const getCurrentSemester = async (req, res, next) => {
    try {

        const result = await semesterService.getCurrentSemester()

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}

const createSemester = async (req, res, next) => {
    try {
        const data = req.body

        const newData = {
            ...data,
            startDate: new Date(data.startDate),
            endDate: new Date(data.endDate)
        }

        const result = await semesterService.createSemester(newData)

        res.status(StatusCodes.CREATED).json(result)
    } catch (error) {
        next(error)
    }
}

const deleteSemester = async (req, res, next) => {
    try {
        const { id } = req.params

        const result = await semesterService.deleteSemester(id)

        res.status(StatusCodes.OK).json(result)
    } catch (error) {
        next(error)
    }
}
const getAllSemesters = async (req, res, next) => {
    try {
      const semesters = await semesterService.getAllSemesters();
      console.log("🔥 Semesters từ DB:", semesters); // 🧪 Xem trong terminal
  
      res.status(200).json(semesters);
    } catch (error) {
      next(error);
    }
  };
  
  const updateSemester = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = req.body;
  
      const newData = {
        ...data,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate)
      };
  
      const result = await semesterService.updateSemester(id, newData);
      res.status(StatusCodes.OK).json(result);
    } catch (error) {
      next(error);
    }
  };
  
export const semesterController = {
    getSemesterByUserId,
    getCurrentSemester,
    createSemester,
    deleteSemester,
    getAllSemesters,
    updateSemester
}