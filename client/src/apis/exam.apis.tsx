import axiosCustomize from "@/lib/axios.customize"

export const createNewExam = async (data: any, courseId: any) => {
    return await axiosCustomize.post('v1/exams/' + courseId, data)
}

export const fetchExamsByCourseId = async (courseId: any) => {
    return await axiosCustomize.get('v1/exams/' + courseId)
}

export const fetchExamDetail = async (id: any) => {
    return await axiosCustomize.get('v1/exams?examId=' + id)
}

export const updateExamById = async (id: any) => {
    return await axiosCustomize.put('v1/exams/' + id)
}

export const fetchExamDetailHasResult = async (id: any) => {
    return await axiosCustomize.get('v1/exams?examId=' + id + '&hasResult=true')
}
