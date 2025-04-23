import axiosCustomize from "@/lib/axios.customize"

export const getAllUsers = async () => {
    return await axiosCustomize.get('/v1/users/list')
}