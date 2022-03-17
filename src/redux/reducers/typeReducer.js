import * as types from "../contants/actionTypes";

const initialState = {
    types: [],
}

const productReducer = (state = initialState, action) => {
    var data = null;
    switch (action.type) {
        case types.GET_ALL_TYPE:
            data = action.payload;
            return {
                ...state,
                types: data,
            }
        case types.ADD_TYPE:
            data = state.types.concat([action.payload]);
            return {
                ...state,
                types: data
            }
        case types.DELETE_TYPE:
            data = state.types.filter((type) => type.id !== action.payload);
            return {
                ...state,
                types: data
            }
        case types.UPDATE_TYPE:
            data = [action.payload];
            var newField = state.types.filter((type) => type.id !== action.payload.id)
            return {
                ...state,
                types: newField.concat(data)
            }
        default: return state
    }
}

export default productReducer;