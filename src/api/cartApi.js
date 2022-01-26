import axiosClient from "./axiosClient";

const userApi = {
    getAll: (id) => {
        const url = `/users/${id}/cart`;
        return axiosClient.get(url);
    },
    addToCart: (userId, data) => {
        const url = `/users/${userId}/cart`;
        return axiosClient.post(url, data);
    },
    updateQuantity: (userId, cartId, data) => {
        const url = `/users/${userId}/cart/${cartId}`;
        return axiosClient.put(url, data);
    },
    removeItem: (userId, cartId) => {
        const url = `/users/${userId}/cart/${cartId}`;
        return axiosClient.delete(url);
    }
}

export default userApi;