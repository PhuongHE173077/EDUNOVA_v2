import axiosCustomize from "@/lib/axios.customize"

export const refreshTokenAPI = async () => {
    return await axiosCustomize.get('v1/refresh_token')
}