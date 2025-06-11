import axiosCustomize from "@/lib/axios.customize"

export const fetchSubjects = async (semesterId: any) => {
    return await axiosCustomize.get('v1/subjects?semesterId=' + semesterId)
}

export const fetchAllSubjects = async () => {
    return await axiosCustomize.get('v1/subjects')
}