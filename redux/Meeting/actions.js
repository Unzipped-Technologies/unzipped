import {
    MEETING_LOADING,
    MEETING_ERROR,
    CREATE_MEETING,
} from './constants';
import _ from 'lodash';
import axios from 'axios';
import { tokenConfig } from '../../services/tokenConfig';

export const createMeeting = (data, token) => async (dispatch, getState) => {
    dispatch({
        type: MEETING_LOADING
    })
    await axios
        .post(`/api/meeting/create`, data, tokenConfig(token))
        .then(res => {
            dispatch({
                type: CREATE_MEETING,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: MEETING_ERROR,
                payload: err.response
            })
        })
};