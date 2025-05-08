import axiosCustomize from "@/lib/axios.customize"

export const fetchAnswerByQuestionId = async (id: any, page: any) => {
    return await axiosCustomize.get(`v1/answer_lessons?questionId=${id}&page=${page}`)
}

export const createNewAnswer = async (data: any) => {
    return await axiosCustomize.post(`v1/answer_lessons`, data)
}