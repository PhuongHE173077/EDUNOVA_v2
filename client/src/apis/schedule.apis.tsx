import axiosCustomize from "@/lib/axios.customize";

export const fetchSchedule = async () => {
    return await axiosCustomize.get('v1/schedules')
};

export const createSchedule = async (data: any) => {
    return await axiosCustomize.post('v1/schedules', data)
}