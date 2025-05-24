import axiosCustomize from "@/lib/axios.customize";

export const fetchLecturers = async () => {
        return await axiosCustomize.get('v1/users/lecturers');
    }
    export const fetchSubjects = async () => {
        return await axiosCustomize.get('v1/subjects')
    }
    
export const fetchSemesters = async () => {
    return await axiosCustomize.get('v1/semesters')
}