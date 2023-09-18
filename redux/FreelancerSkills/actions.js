import {
    GET_LIST_FREELANCERSKILLS,
    FREELANCERSKILLS_ERROR,
} from './constants';
import _ from 'lodash';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';

export const getFreelancerSkillsList = (token) => async (dispatch, getState) => {
    // Set the token in the request headers
    const headers = {
        access_token: token
    };
    try {
        const response = await axios.get(`api/freelancerSkills`, {
            headers,
        });
        dispatch({
            type: GET_LIST_FREELANCERSKILLS,
            payload: response.data
        });
    } catch (err) {
        dispatch({
            type: FREELANCERSKILLS_ERROR,
            payload: err.response
        });
    }
};

