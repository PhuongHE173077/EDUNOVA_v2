import axiosCustomize from "@/lib/axios.customize"

export const createNewRsExam = async (examId: any) => {
    return await axiosCustomize.post('v1/result_exams?examId=' + examId)
}

export const updateRsExam = async (examId: any, data: any) => {
    return await axiosCustomize.put('v1/result_exams?examId=' + examId, data)
}

export const fetchAFewRsExam = async () => {
    return await axiosCustomize.get('v1/result_exams/af')
}