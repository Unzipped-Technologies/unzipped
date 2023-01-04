import {
    MESSAGES_LOADING,
    GET_CONVERSATIONS,
    SEND_MESSAGE,
    ARCHIVE_CONVERSATION,
    MESSAGE_ERROR,
    SELECT_CONVERSATION,
} from './constants';
import _ from 'lodash';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';

export const getConversationList = (data, token) => async (dispatch, getState) => {
    dispatch({
        type: MESSAGES_LOADING
    })
    await axios
        .post(`/api/message/list`, data, tokenConfig(token))
        .then(res => dispatch({
            type: GET_CONVERSATIONS,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: MESSAGE_ERROR,
                payload: err.response
            })
        })
};

export const sendMessage = (data, token) => async (dispatch, getState) => {
    dispatch({
        type: MESSAGES_LOADING
    })
    await axios
        .post(`/api/message/send`, data, tokenConfig(token))
        .then(res => dispatch({
            type: SEND_MESSAGE,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: MESSAGE_ERROR,
                payload: err.response
            })
        })
};

export const selectConversation = (id, token) => async (dispatch, getState) => {
    dispatch({
        type: MESSAGES_LOADING
    })
    await axios
        .get(`/api/message/${id}`, tokenConfig(token))
        .then(res => dispatch({
            type: SELECT_CONVERSATION,
            payload: res.data
        }))
        .catch(err => {
            dispatch({
                type: MESSAGE_ERROR,
                payload: err.response
            })
        })
};