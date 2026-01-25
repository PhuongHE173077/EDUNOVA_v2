import axiosCustomize from "@/lib/axios.customize";

export const createAttend = async (scheduleId: any, data: any) => {
    return await axiosCustomize.post(`v1/attends/schedule/${scheduleId}`, data);
}

export const fetchAttendByScheduleId = async (scheduleId: string) => {
    return await axiosCustomize.get(`v1/attends/schedule/${scheduleId}`);
}

export const fetchAttend = async () => {
    return await axiosCustomize.get(`v1/attends`);
}