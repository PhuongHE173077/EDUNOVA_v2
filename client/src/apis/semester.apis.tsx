import axiosCustomize from "@/lib/axios.customize"

export const fetchSemesters = async () => {
    return await axiosCustomize.get('v1/semesters')
}
export const fetchCurrentSemester = async () => {
    return await axiosCustomize.get('v1/semesters/current')
}
export const updateSemester = async (id: any, data: any) => {
    return await axiosCustomize.put(`v1/semesters/${id}`, data)
}
export const createSemester = async (data: any) => {
    return await axiosCustomize.post('v1/semesters', data)
}
export const deleteSemester = async (id: any) => {
    return await axiosCustomize.delete(`v1/semesters/${id}`)
}