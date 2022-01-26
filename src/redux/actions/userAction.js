import * as types from "../contants/actionTypes";
import userApi from "../../api/userApi";

export const fetchUser = (users) => {
    return {
        type: types.FETCH_USER,
        payload: users
    }
}

export const fetchUserRequest = () => {
    return async (dispatch) => {
        const response = await userApi.getAll();
        dispatch(fetchUser(response));
    }
}

export const addUser = (user) => {
    return {
        type: types.ADD_USER,
        payload: user
    }
}

export const addUserRequest = (data) => {
    return async (dispatch) => {
        const response = await userApi.addUser(data);
        dispatch(addUser(response));
    }
}

export const deleteUser = (user) => {
    return {
        type: types.DELETE_USER,
        payload: user
    }
}

export const deleteUserRequest = (id) => {
    return async (dispatch) => {
        const response = await userApi.deleteUser(id);
        dispatch(deleteUser(response));
    }
}

export const updateUser = (user) => {
    return {
        type: types.UPDATE_USER,
        payload: user
    }
}

export const updateUserRequest = (id, data) => {
    return async (dispatch) => {
        // dispatch(isLoading());
        const response = await userApi.updateUser(id, data);
        dispatch(updateUser(response));
    }
}

// export const fetchUserById = (user) => {
//     return {
//         type: types.FETCH_USER_BY_ID,
//         payload: user
//     }
// }

// export const fetchUserByIdRequest = (id) => {
//     return async (dispatch) => {
//         const response = await userApi.addUser(id);
//         dispatch(fetchUserById(response));
//     }
// }