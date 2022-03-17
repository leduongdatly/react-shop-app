import * as types from "../contants/actionTypes";

const initialState = {
    cartData: [],
    userCartData: []
}

const userReducer = (state = initialState, action) => {
    var data = null;
    switch (action.type) {
        case types.GET_ALL_CART:
            data = action.payload;
            return {
                ...state,
                cartData: data
            }
        case types.GET_USER_CART_DATA:
            data = action.payload;
            return {
                ...state,
                userCartData: data
            }
        case types.ADD_TO_CART:
            data = [action.payload];
            return {
                ...state,
                userCartData: state.userCartData.concat(data),
            }
        case types.INCREASE_QUANTITY:
            data = state.userCartData.map((cartItem) =>
                cartItem.pid === action.payload ? { ...cartItem, quantity: cartItem.quantity += 1 } : cartItem
            )
            return {
                ...state,
                userCartData: data
            }
        case types.DECREASE_QUANTITY:
            data = state.userCartData.map((cartItem) =>
                cartItem.pid === action.payload ? { ...cartItem, quantity: cartItem.quantity -= 1 } : cartItem
            )
            return {
                ...state,
                userCartData: data
            }
        case types.DELETE_USER_CART_PRODUCT:
            data = state.userCartData.filter((cartItem) => cartItem.id !== action.payload);
            return {
                ...state,
                userCartData: data
            }
        default: return state
    }
}

export default userReducer;