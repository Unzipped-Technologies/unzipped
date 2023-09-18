import {
    FREELANCER_LOADING,
    GET_LIST_FREELANCERS,
    GET_FREELANCER_BY_ID,
    RESET_SELECTED_FREELANCER,
    FREELANCER_ERROR,
} from './constants';
import _ from 'lodash';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';

export const getFreelancerList = (queryParams, token) => async (dispatch, getState) => {
    dispatch({
        type: FREELANCER_LOADING
    });
    const headers = {
        access_token: token
    };

    try {
        const response = await axios.get(`/api/user/freelancer/list`, {
            headers,
            params: queryParams
        });
        dispatch({
            type: GET_LIST_FREELANCERS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: FREELANCER_ERROR,
            payload: err.response
        });
    }
};

export const getFreelancerById = (id, token) => async (dispatch, getState) => {
    dispatch({
        type: FREELANCER_LOADING
    })
    await axios
        .get(`/api/user/freelancer/${id}`, tokenConfig(token))
        .then(res => dispatch({
            type: GET_FREELANCER_BY_ID,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: FREELANCER_ERROR,
                payload: err.response
            })
        })
};

export const clearSelectedFreelancer = () => async (dispatch, getState) => {
    dispatch({
        type: RESET_SELECTED_FREELANCER
    })
};
