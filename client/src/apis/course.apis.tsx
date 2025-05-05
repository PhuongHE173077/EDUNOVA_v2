import axiosCustomize from "@/lib/axios.customize"

export const fetchCourses = async () => {
    return await axiosCustomize.get('v1/courses')
}

export const fetchCoursesById = async (id: any) => {
    return await axiosCustomize.get(`v1/courses/${id}`)
}