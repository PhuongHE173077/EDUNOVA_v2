import axiosCustomize from "@/lib/axios.customize"

export const uploadImageAPIs = async (image: any) => {
    return await axiosCustomize.post('v1/image/upload', image)
}