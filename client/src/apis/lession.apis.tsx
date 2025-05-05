import axiosCustomize from "@/lib/axios.customize"

export const fetchLessonByCourseId = async (id: string) => {
    return await axiosCustomize.get(`v1/lessons/${id}`)
}