import * as types from "../contants/actionTypes";

const initialState = {
    products: [],
}

const productReducer = (state = initialState, action) => {
    var data = null;
    switch (action.type) {
        case types.GET_ALL_PRODUCT:
            data = action.payload;
            return {
                ...state,
                products: data,
            }
        case types.DELETE_PRODUCT:
            data = state.products.filter((product) => product.id !== action.payload);
            return {
                ...state,
                products: data,
            }
        case types.ADD_PRODUCT:
            data = state.products.concat([action.payload]);
            return {
                ...state,
                products: data,
            }
        case types.UPDATE_PRODUCT:
            data = [action.payload];
            var newField = state.products.filter((product) => product.id !== action.payload.id);
            return {
                ...state,
                products: newField.concat(data),
            }
        default: return state
    }
}

export default productReducer;