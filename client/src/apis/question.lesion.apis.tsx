import axiosCustomize from "@/lib/axios.customize"

export const fetchQuestionById = async (id: string) => {
    return await axiosCustomize.get(`v1/question_lessons/${id}`)
}

export const fetchQuestionsByLessonId = async (id: string) => {
    return await axiosCustomize.get(`v1/question_lessons?lessonId=${id}`)
}