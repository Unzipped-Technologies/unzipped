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
    SORT_STORIES_ON_DRAG,
    SELECT_BUSINESS,
    GET_DEPARTMENT_BY_ID,
    DEPARTMENT_ERROR,
    LOAD_STATE,
    CREATE_BUSINESS,
    UPDATE_BUSINESS_FORM,
    RESET_BUSINESS_FORM,
    GET_BUSINESSES,
    UPDATE_CREATE_STORY
} from './constants';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';

export const updateBusinessForm = (data, token) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_BUSINESS_FORM,
        payload: data,
    })
}

export const updateCreateStoryForm = (data, token) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_CREATE_STORY,
        payload: data,
    })
}

export const resetBusinessForm = () => async (dispatch, getState) => {
    dispatch({
        type: RESET_BUSINESS_FORM
    })
}

export const createStory = (data, token) => async (dispatch, getState) => {
    //department Loading
    dispatch({type: LOAD_STATE})

    await axios
        .post(`/api/business/current/task/create`, data, tokenConfig(token))
        .then(res => dispatch({
            type: CREATE_STORY,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: err.response
            })
        })
}

export const createBusiness = (data, token) => async (dispatch, getState) => {
    //department Loading
    dispatch({type: LOAD_STATE})

    await axios
        .post(`/api/business/create`, data, tokenConfig(token))
        .then(res => dispatch({
            type: CREATE_BUSINESS,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: err.response
            })
        })
}

export const getBusinessList = (data, token) => async (dispatch, getState) => {
    //business list Loading
    dispatch({type: LOAD_STATE})

    await axios
        .post(`/api/business/user/list`, data, tokenConfig(token))
        .then(res => dispatch({
            type: GET_BUSINESSES,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: err.response
            })
        })
}

export const getDepartmentsForBusiness = (data, token) => async (dispatch, getState) => {
    //business list Loading
    dispatch({type: LOAD_STATE})

    await axios
        .post(`/api/business/department/list`, data, tokenConfig(token))
        .then(res => dispatch({
            type: GET_DEPARTMENTS,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: err.response
            })
        })
}

export const getBusinessById = (id, token) => async (dispatch, getState) => {
    //business list Loading
    dispatch({type: LOAD_STATE})
    console.log('here here here')
    await axios
        .get(`/api/business/${id}`, tokenConfig(token))
        .then(res => dispatch({
            type: SELECT_BUSINESS,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: err.response
            })
        })
}

export const getDepartmentsById = (id, token) => async (dispatch, getState) => {
    //business list Loading
    dispatch({type: LOAD_STATE})

    await axios
        .get(`/api/business/department/${id}`, tokenConfig(token))
        .then(res => dispatch({
            type: GET_DEPARTMENT_BY_ID,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: DEPARTMENT_ERROR,
                payload: err.response
            })
        })
}

export const createDepartment = (data) => async (dispatch, getState) => {
    //department Loading
    dispatch({type: LOAD_STATE})

    await axios
        .post(`/api/department/create`, data, tokenConfig(token))
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
    dispatch({type: LOAD_STATE})

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
    dispatch({type: LOAD_STATE})

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

export const updateTasksOrder = (data, token) => async (dispatch, getState) => {
    //tasks Loading
    dispatch({type: LOAD_STATE})
    dispatch({
        type: SORT_STORIES_ON_DRAG,
        payload: data,
    })
    // await axios
    //     .post(`/api/dashboard/status`, {status, order}, tokenConfig(token))
    //     .then(res => dispatch({
    //         type: SORT_STORIES_ON_DRAG,
    //         payload: res.data,
    //     }))
    //     .catch(err => {
    //         // dispatch(returnErrors(err.response, err.response))
    //         dispatch({
    //             type: UPDATE_ERROR,
    //             payload: err.response
    //         })
    //     })
}

