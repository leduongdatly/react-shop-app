import * as types from "../contants/actionTypes";

export const getAllCartData = (data) => {
    return {
        type: types.GET_ALL_CART,
        payload: data
    }
}

export const addToCart = (data) => {
    return {
        type: types.ADD_TO_CART,
        payload: data
    }
}

export const increaseQuantity = (id) => {
    return {
        type: types.INCREASE_QUANTITY,
        payload: id
    }
}

export const decreaseQuantity = (id) => {
    return {
        type: types.DECREASE_QUANTITY,
        payload: id
    }
}

export const deleteUserCartProduct = (id) => {
    return {
        type: types.DELETE_USER_CART_PRODUCT,
        payload: id
    }
}

export const getUserCartData = (data) => {
    return {
        type: types.GET_USER_CART_DATA,
        payload: data
    }
}