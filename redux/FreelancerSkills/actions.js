import {
    GET_LIST_FREELANCERSKILLS,
    FREELANCERSKILLS_ERROR,
    GET_ALL_FREELANCERS,
    GET_ALL_FREELANCERS_ERROR,
    CREATE_USER_INVITATION_SUCCESS,
    CREATE_USER_INVITATION_ERROR
} from './constants'
import _ from 'lodash'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'

export const getFreelancerSkillsList = token => async (dispatch, getState) => {
    // Set the token in the request headers
    const headers = {
        access_token: token
    }
    try {
        const response = await axios.get(`api/freelancerSkills`, {
            headers
        })
        dispatch({
            type: GET_LIST_FREELANCERSKILLS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: FREELANCERSKILLS_ERROR,
            payload: err.response
        })
    }
    dispatch(stopLoading())
}

export const getAllFreelancers = (token, skip, take, minRate, maxRate, skill, name, sort) => async dispatch => {
    dispatch(startLoading())
    try {
        const params = { skip, take, minRate, maxRate, skill, name, sort};
        const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
            if (value !== null && value !== undefined && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});
        const queryString = new URLSearchParams(filteredParams).toString();
        const response = await axios.get(`api/user/getAllFreelancers?${queryString}`);

        dispatch({
            type: GET_ALL_FREELANCERS,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: GET_ALL_FREELANCERS_ERROR,
            payload: err.response
        })
    }
    dispatch(stopLoading())
}

export const createUserInvitation = (params, token) => async dispatch => {
    dispatch(startLoading())
    try {
        const response = await axios.post(`api/user/create-freelancer-invite`, params)
        dispatch({ type: CREATE_USER_INVITATION_SUCCESS, payload: response.data })
    } catch (error) {
        dispatch({
            type: CREATE_USER_INVITATION_ERROR,
            payload: error
        })
    }
    dispatch(stopLoading())
}
