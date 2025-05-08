import axiosCustomize from "@/lib/axios.customize"

export const fetchQuestionByLessonId = async (id: string) => {
    return await axiosCustomize.get(`v1/question_lessons/${id}`)
}