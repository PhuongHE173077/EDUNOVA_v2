import axiosCustomize from "@/lib/axios.customize";

export const fetchSchedule = async () => {
    return await axiosCustomize.get('v1/schedules')
};