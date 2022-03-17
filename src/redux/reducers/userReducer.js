import * as types from "../contants/actionTypes";

const initialState = {
    users: [],
}

const userReducer = (state = initialState, action) => {
    var data = null;
    switch (action.type) {
        case types.GET_ALL_USER:
            data = action.payload;
            return {
                ...state,
                users: data
            }
        case types.UPDATE_USER_ROLE:
            data = state.users.map((user) =>
                user.id === action.payload ? {...user, role: user.role === "admin" ? "customer" : "admin"} : user 
            )
            return {
                ...state,
                users: data
            }
        default: return state
    }
}

export default userReducer;