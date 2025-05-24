import axiosCustomize from "@/lib/axios.customize";

export const fetchUsers = () => axiosCustomize.get('v1/users/list');
export const createUser = (data: any) => axiosCustomize.post('v1/register', data);
export const updateUser = (id: string, data: any) => axiosCustomize.put(`v1/update`, data);
export const deleteUser = (id: string) => axiosCustomize.delete(`v1/user/${id}`);
export const loginUser = (data: any) => axiosCustomize.post('v1/login', data);
