import axiosCustomize from "@/lib/axios.customize"

export const fetchQuestionById = async (id: string) => {
    return await axiosCustomize.get(`v1/question_lessons/${id}`)
}

export const fetchQuestionsByLessonId = async (id: string) => {
    return await axiosCustomize.get(`v1/question_lessons?lessonId=${id}`)
}

export const createNewQuestion = async (data: any) => {
    return await axiosCustomize.post(`v1/question_lessons`, data)
}

export const createNewAssignment = async (data: any) => {
    return await axiosCustomize.post(`v1/question_lessons/assignment`, data)
}