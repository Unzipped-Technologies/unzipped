import {
    MESSAGES_LOADING,
    GET_CONVERSATIONS,
    MESSAGE_ERROR,
    SELECT_CONVERSATION,
    UPDATE_CONVERSATION_STATUS,
    UPDATE_CONVERSATION_MESSAGE,
} from './constants';
import _ from 'lodash';
import axios from 'axios';
import { tokenConfig } from '../../services/tokenConfig';

export const getConversationList = (data, token) => async (dispatch, getState) => {
    dispatch({
        type: MESSAGES_LOADING
    })
    await axios
        .post(`/api/message/list`, data, tokenConfig(token))
        .then(res => {
            dispatch({
                type: GET_CONVERSATIONS,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: MESSAGE_ERROR,
                payload: err.response
            })
        })
};

export const selectConversation = (id, token, limit) => async (dispatch, getState) => {
    dispatch({
        type: MESSAGES_LOADING
    })
    await axios
        .get(`/api/message/${id}?limit=${limit}`, tokenConfig(token))
        .then(res => {
            dispatch({
                type: SELECT_CONVERSATION,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: MESSAGE_ERROR,
                payload: err.response
            })
        })
};

export const updateChatStatus = (type, status, id, token) => async (dispatch, getState) => {
    dispatch({
        type: UPDATE_CONVERSATION_STATUS,
        payload: type
    });
    await axios
        .patch(`/api/message/${id}`, {
            type: type,
            status: status,
        }, {
            headers: {
                'Content-type': 'application/json',
                'access_token': token,
            }
        })
        .then()
        .catch(err => {
            dispatch({
                type: MESSAGE_ERROR,
                payload: err.response
            });
        });

};

export const handleUnreadMessages = (message) => async (dispatch) => {
    dispatch({
        type: UPDATE_CONVERSATION_MESSAGE,
        payload: message
    });

}