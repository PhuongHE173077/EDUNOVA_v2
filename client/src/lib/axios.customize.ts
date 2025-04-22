import axios from "axios";
import { toast } from "react-toastify";

const axiosCustomize = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 10000,
    withCredentials: true
})


axiosCustomize.interceptors.request.use(function (config) {

    return config;
}, function (error) {

    return Promise.reject(error);
});

let refreshTokenPromise: any = null;

axiosCustomize.interceptors.response.use(function (response) {


    return response;
}, function (error) {
    console.log("🚀 ~ error:", error?.response?.data?.message)
    if (error?.response?.status === 401) {
        toast.error(error?.response?.data?.message)
    }

    const originalRequest = error.config;

    if (error?.response?.status === 410 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (!refreshTokenPromise) {
            // refreshTokenPromise = refreshTokenAPI()
            //     .then((data:any) => {
            //         return data?.accessToken
            //     })
            //     .catch((error:any) => {
            //         //if have any error from API refresh token , we will logout
            //         axiosRduxStore.dispatch(logoutUserAPI(false))
            //         return Promise.reject(error)
            //     })
            //     .finally(() => {
            //         refreshTokenPromise = null
            //     })
        }

    } else {
        toast.error(error?.response?.data?.message)
    }

    return Promise.reject(error);
});

export default axiosCustomize;