import * as types from "../contants/actionTypes";

export const getAllProduct = (products) => {
    return {
        type: types.GET_ALL_PRODUCT,
        payload: products
    }
}

export const deleteProduct = (id) => {
    return {
        type: types.DELETE_PRODUCT,
        payload: id
    }
}

export const addProduct = (data) => {
    return {
        type: types.ADD_PRODUCT,
        payload: data
    }
}

export const updateProduct = (data) => {
    return {
        type: types.UPDATE_PRODUCT,
        payload: data
    }
}