import axiosCustomize from "@/lib/axios.customize"

export const fetchCourses = async () => {
    return await axiosCustomize.get('v1/courses/list')
}

export const fetchCoursesById = async (id: any) => {
    return await axiosCustomize.get(`v1/courses/${id}`)
}

export const fetchCourseBySemesterIdAndSubjectId = async (semesterId: any, subjectId: any) => {
    return await axiosCustomize.get(`v1/courses?semesterId=${semesterId}&subjectId=${subjectId}`)
}

export const updateCourse = async (id: string, data: any) => {
    return await axiosCustomize.put(`v1/courses/${id}`, data);
};

export const deleteCourse = async (id: any) => {
    return await axiosCustomize.delete(`v1/courses/${id}`)
}

export const createCourse = async (data: any) => {
    return await axiosCustomize.post('v1/courses', data)
}


export const fetchCourseBySemesterId = async (semesterId: any) => {
    return await axiosCustomize.get(`v1/courses?semesterId=${semesterId}`)
}
