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
    LOAD_STATE,
    CREATE_BUSINESS,
    UPDATE_BUSINESS_FORM,
    RESET_BUSINESS_FORM,
    GET_BUSINESSES
} from './constants';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';

export const updateBusinessForm = (data, token) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_BUSINESS_FORM,
        payload: data,
    })
}

export const resetBusinessForm = () => async (dispatch, getState) => {
    dispatch({
        type: RESET_BUSINESS_FORM
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
    console.log('data', data)
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

