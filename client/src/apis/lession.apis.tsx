import axiosCustomize from "@/lib/axios.customize"

export const fetchLessonByCourseId = async (id: string) => {
    return await axiosCustomize.get(`v1/lessons/${id}?populate=course`)
}
export const fetchLessonById = async (id: any) => {
    return await axiosCustomize.get(`v1/lessons/${id}`)
}