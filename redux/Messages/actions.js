import {
  MESSAGES_LOADING,
  GET_CONVERSATIONS,
  MESSAGE_ERROR,
  SELECT_CONVERSATION,
  UPDATE_CONVERSATION_STATUS,
  UPDATE_CONVERSATION_MESSAGE,
  SET_COUNT_ZERO,
  RESET_MESSAGE_STORE
} from './constants'
import _ from 'lodash'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'

export const getConversationList = (data, token) => async (dispatch, getState) => {
  dispatch({
    type: MESSAGES_LOADING
  })
  await axios
    .post(`/api/message/list`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: GET_CONVERSATIONS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response
      })
    })
}

export const selectConversation = (id, limit) => async (dispatch, getState) => {
  dispatch({
    type: MESSAGES_LOADING
  })
  await axios
    .get(`/api/message/${id}?limit=${limit}`, tokenConfig(getState()?.Auth.token))
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
}

export const updateChatStatus = (type, status, id, token) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_CONVERSATION_STATUS,
    payload: type
  })
  await axios
    .patch(
      `/api/message/${id}`,
      {
        type: type,
        status: status
      },
      {
        headers: {
          'Content-type': 'application/json',
          access_token: token
        }
      }
    )
    .then()
    .catch(err => {
      dispatch({
        type: MESSAGE_ERROR,
        payload: err.response
      })
    })
}

export const handleUnreadMessages = message => async dispatch => {
  dispatch({
    type: UPDATE_CONVERSATION_MESSAGE,
    payload: message
  })
}

export const setCountToZero = data => async dispatch => {
  dispatch({
    type: SET_COUNT_ZERO,
    payload: data
  })
}

export const resetMessageStore = data => async dispatch => {
  dispatch({
    type: RESET_MESSAGE_STORE,
    payload: data
  })
}
