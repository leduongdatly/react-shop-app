import * as types from "../contants/actionTypes";

export const getAllTypes = (cat) => {
    return {
        type: types.GET_ALL_TYPE,
        payload: cat
    }
}

export const addType = (data) => {
    return {
        type: types.ADD_TYPE,
        payload: data
    }
}

export const deleteType = (id) => {
    return {
        type: types.DELETE_TYPE,
        payload: id
    }
}

export const updateType = (data) => {
    return {
        type: types.UPDATE_TYPE,
        payload: data
    }
}