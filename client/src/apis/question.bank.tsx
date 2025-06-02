import axiosCustomize from "@/lib/axios.customize"

export const fetchQuestionBank = async () => {
    return await axiosCustomize.get('v1/question_banks')
}

export const createNewQuestionBank = async (data: any) => {
    return await axiosCustomize.post('v1/question_banks', data)
}