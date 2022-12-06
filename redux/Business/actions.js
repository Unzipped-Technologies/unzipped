import {
    CREATE_DEPARTMENT,
    UPDATE_DEPARTMENT,
    DELETE_DEPARTMENT,
    GET_DEPARTMENTS,
    CREATE_TAG,
    UPDATE_TAG,
    GET_TAGS,
    DELETE_TAG,
    CREATE_STORY,
    UPDATE_STORY,
    DELETE_STORY,
    SELECT_DEPARTMENT,
    GET_STORIES,
    DEPARTMENT_ERROR,
    LOAD_DEPARTMENTS,
} from './constants';

export const createDepartment = (data) => async (dispatch, getState) => {
    //department Loading
    dispatch({type: LOAD_DEPARTMENTS})

    await axios
        .post(`/api/department/create`, data)
        .then(res => dispatch({
            type: CREATE_DEPARTMENT,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: err.response
            })
        })
}

// TODO update department BE route and action
export const updateDepartment = (data) => async (dispatch, getState) => {
    //department Loading
    dispatch({type: LOAD_DEPARTMENTS})

    // await axios
    //     .post(`/api/department/update`, data)
    //     .then(res => dispatch({
    //         type: CREATE_DEPARTMENT,
    //         payload: res.data,
    //     }))
    //     .catch(err => {
    //         dispatch({
    //             type: DEPARTMENT_ERROR,
    //             payload: err.response
    //         })
    //     })
    dispatch({
        type: CREATE_DEPARTMENT,
        payload: data,
    });
}

export const deleteDepartment = (data) => async (dispatch, getState) => {
    //department Loading
    dispatch({type: LOAD_DEPARTMENTS})

    await axios
        .post(`/api/department/delete`, data)
        .then(res => dispatch({
            type: CREATE_DEPARTMENT,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: err.response
            })
        })
}

