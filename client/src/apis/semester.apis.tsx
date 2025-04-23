import axiosCustomize from "@/lib/axios.customize"

export const fetchSemesters = async () => {
    return await axiosCustomize.get('/v1/semesters')
}