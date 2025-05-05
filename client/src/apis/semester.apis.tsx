import axiosCustomize from "@/lib/axios.customize"

export const fetchSemesters = async () => {
    return await axiosCustomize.get('v1/semesters')
}
export const fetchCurrentSemester = async () => {
    return await axiosCustomize.get('v1/semesters/current_semester')
}