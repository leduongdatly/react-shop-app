import * as types from "../contants/actionTypes";

const initialState = {
    products: [],
    isLoading: false,
}

const userReducer = (state = initialState, action) => {
    const products = state.products;
    switch (action.type) {
        case types.IS_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case types.FETCH_USER_CART:
            return {
                ...state,
                products: action.payload,
                isLoading: false,
            }
        case types.ADD_TO_CART:
            const product = [action.payload];
            return {
                ...state,
                products: products.concat(product),
                isLoading: false,
            }
        case types.UPDATE_QUANTITY:
            const exist = products.find((x) => x.id === action.payload.id);
            if (exist) {
                return {
                    ...state,
                    products: products.map((x) =>
                        x.id === action.payload.id ? { ...x, quantity: action.payload.quantity } : x
                    ),
                    isLoading: false,
                }
            }
        case types.DELETE_ITEM:
            const newArr = products.filter((products) => products.id !== action.payload.id);
            return {
                ...state,
                products: newArr,
                isLoading: false,
            }
        default: return state
    }
}

export default userReducer;