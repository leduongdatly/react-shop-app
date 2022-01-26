import axios from "axios";
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
        "Content-Type": "multipart/form-data"
    },
    paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    // handle token here
    return config;
});

axiosClient.interceptors.response.use(async (response) => {
    if(response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    // handel error
    throw error;
});

export default axiosClient;