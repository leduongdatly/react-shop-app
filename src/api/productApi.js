import axiosClient from "./axiosClient";

const productApi = {
    getAll: (params) => {
        const url = '/products';
        return axiosClient.get(url, { params });
    },
    getById: (id) => {
        const url = `/products/${id}`;
        return axiosClient.get(url);
    },
    addProduct: (data) => {
        const url = '/products';
        return axiosClient.post(url, data);
    },
    deleteProduct: (id) => {
        const url = `/products/${id}`;
        return axiosClient.delete(url);
    },
    updateProduct: (id, data) => {
        const url = `/products/${id}`;
        return axiosClient.put(url, data);
    }
}

export default productApi;