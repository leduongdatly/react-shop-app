import * as types from "../contants/actionTypes";
import cartApi from "../../api/cartApi";

export const isLoading = () => {
    return {
        type: types.IS_LOADING,
    }
}

// export const isAddToCart = () => {
//     return {
//         type: types.IS_ADD_TO_CART,
//     }
// }

export const fetchUserCart = (carts) => {
    return {
        type: types.FETCH_USER_CART,
        payload: carts
    }
}

export const fetchUserCartRequest = (id) => {
    return async (dispatch) => {
        dispatch(isLoading());
        const response = await cartApi.getAll(id);
        dispatch(fetchUserCart(response));
    }
}

export const actAddToCart = (product) => {
    return {
        type: types.ADD_TO_CART,
        payload: product
    }
}

export const actAddToCartRequest = (userId, data) => {
    return async (dispatch) => {
        // dispatch(isAddToCart());
        const response = await cartApi.addToCart(userId, data);
        dispatch(actAddToCart(response));
    }
}

export const updataQuantity = (product) => {
    return {
        type: types.UPDATE_QUANTITY,
        payload: product
    }
}

export const updataQuantityRequest = (userId, cartId, data) => {
    return async (dispatch) => {
        const response = await cartApi.updateQuantity(userId, cartId, data);
        dispatch(updataQuantity(response));
    }
}

export const deleteItem = (id) => {
    return {
        type: types.DELETE_ITEM,
        payload: id
    }
}

export const deleteItemRequest = (userId, cartId) => {
    return async (dispatch) => {
        const response = await cartApi.removeItem(userId, cartId);
        dispatch(deleteItem(response));
    }
}