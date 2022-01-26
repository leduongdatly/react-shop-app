import * as types from "../contants/actionTypes";

const initialState = {
    users: [],
}

const userReducer = (state = initialState, action) => {
    const users = state.users;
    switch (action.type) {
        case types.FETCH_USER:
            return {
                ...state,
                users: action.payload,
            }
        case types.ADD_USER:
            const user = [action.payload];
            return {
                ...state,
                users: users.concat(user),
            }
        case types.DELETE_USER:
            const newUsers = users.filter((user) => user.id !== action.payload.id);
            return {
                ...state,
                users: newUsers,
            }
        case types.UPDATE_USER:
            // const newUsers1 = users.filter((user) => user.id !== action.payload.id);
            // const user1 = [action.payload];
            return {
                ...state,
                users: users.map((user) => 
                    user.id === action.payload.id ? action.payload : user 
                )
            }
        // case types.FETCH_USER_BY_ID:
        //     console.log(action);
        //     return {
        //         ...state,
        //         users: action.payload,
        //         isLogin: true
        //     }
        default: return state
    }
}

export default userReducer;