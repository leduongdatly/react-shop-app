import axiosClient from "./axiosClient";

const userApi = {
    getAll: (params) => {
        const url = '/users';
        return axiosClient.get(url, { params });
    },
    getById: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    addUser: (data) => {
        const url = '/users';
        return axiosClient.post(url, data);
    },
    deleteUser: (id) => {
        const url = `/users/${id}`;
        return axiosClient.delete(url);
    },
    updateUser: (id, data) => {
        const url = `/users/${id}`;
        return axiosClient.put(url, data);
    }
}

export default userApi;