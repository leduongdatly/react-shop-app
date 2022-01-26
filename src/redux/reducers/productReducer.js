import * as types from "../contants/actionTypes";

const initialState = {
    products: [],
    isLoading: false
}

const productReducer = (state = initialState, action) => {
    const products = state.products;
    switch (action.type) {
        case types.IS_LOADING:
            return {
                ...state,
                products: [],
                isLoading: true
            }
        case types.FETCH_PRODUCT:
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }
        case types.FETCH_PRODUCT_BY_ID:
            return {
                ...state,
                products: action.payload,
                isLoading: false
            }
        case types.ADD_PRODUCT:
            const product = [action.payload];
            return {
                ...state,
                products: products.concat(product),
                isLoading: false
            }
        case types.DELETE_PRODUCT:
            const newProducts = products.filter((products) => products.id !== action.payload.id);
            return {
                ...state,
                products: newProducts,
                isLoading: false
            }
        case types.UPDATE_PRODUCT:
            return {
                ...state,
                products: products.map((product) => 
                    product.id === action.payload.id ? action.payload : product
                ),
                isLoading: false,
            }
        default: return state
    }
}

export default productReducer;