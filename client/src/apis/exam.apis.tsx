import axiosCustomize from "@/lib/axios.customize"

export const createNewExam = async (data: any, courseId: any) => {
    return await axiosCustomize.post('v1/exams/' + courseId, data)
}