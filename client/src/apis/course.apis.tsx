import axiosCustomize from "@/lib/axios.customize"

export const fetchCourses = async () => {
    return await axiosCustomize.get('v1/courses')
}

export const fetchCoursesById = async (id: any) => {
    return await axiosCustomize.get(`v1/courses/${id}`)
}

export const fetchCourseBySemesterIdAndSubjectId = async (semesterId: any, subjectId: any) => {
    return await axiosCustomize.get(`v1/courses?semesterId=${semesterId}&subjectId=${subjectId}`)
}

export const updateCourse = async (id: any, data: any) => {
    return await axiosCustomize.put(`v1/courses/${id}`, data)
}