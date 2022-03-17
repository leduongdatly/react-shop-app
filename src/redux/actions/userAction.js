import * as types from "../contants/actionTypes";

export const getAllUsers = (users) => {
    return {
        type: types.GET_ALL_USER,
        payload: users
    }
}

export const updateUserRole = (id) => {
    return {
        type: types.UPDATE_USER_ROLE,
        payload: id
    }
}