import * as types from "../contants/actionTypes";
import productApi from "../../api/productApi";

export const isLoading = () => {
    return {
        type: types.IS_LOADING,
    }
}

export const fetchProduct = (products) => {
    return {
        type: types.FETCH_PRODUCT,
        payload: products
    }
}

export const fetchProductRequest = () => {
    return async (dispatch) => {
        dispatch(isLoading());
        const response = await productApi.getAll();
        dispatch(fetchProduct(response));
    }
}

export const fetchProductById = (product) => {
    return {
        type: types.FETCH_PRODUCT_BY_ID,
        payload: product
    }
}

export const fetchProductByIdRequest = (id) => {
    return async (dispatch) => {
        dispatch(isLoading());
        const response = await productApi.getById(id);
        dispatch(fetchProductById(response));
    }
}

export const addProduct = (product) => {
    return {
        type: types.ADD_PRODUCT,
        payload: product
    }
}

export const addProductRequest = (data) => {
    return async (dispatch) => {
        // dispatch(isLoading());
        const response = await productApi.addProduct(data);
        dispatch(addProduct(response));
    }
}

export const deleteProduct = (product) => {
    return {
        type: types.DELETE_PRODUCT,
        payload: product
    }
}

export const deleteProductRequest = (id) => {
    return async (dispatch) => {
        // dispatch(isLoading());
        const response = await productApi.deleteProduct(id);
        dispatch(deleteProduct(response));
    }
}

export const updateProduct = (product) => {
    return {
        type: types.UPDATE_PRODUCT,
        payload: product
    }
}

export const updateProductRequest = (id, data) => {
    return async (dispatch) => {
        // dispatch(isLoading());
        const response = await productApi.updateProduct(id, data);
        dispatch(updateProduct(response));
    }
}