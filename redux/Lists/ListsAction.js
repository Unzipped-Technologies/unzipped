import {
  CREATE_USER_LIST,
  CREATE_USER_LIST_ERROR,
  CREATE_USER_LIST_SUCCESS,
  EDIT_USER_LIST,
  EDIT_USER_LIST_ERROR,
  EDIT_USER_LIST_SUCCESS,
  DELETE_USER_LIST,
  DELETE_USER_LIST_SUCCESS,
  DELETE_USER_LIST_ERROR,
  ON_UPDATE_LIST,
  GET_INVITES_LIST,
  GET_INVITES_LIST_ERROR
} from './constant'
import axios from 'axios'
import { startLoading, stopLoading } from '../Loading/actions'
import { tokenConfig } from '../../services/tokenConfig'

const createList = (params, token, cb) => async dispatch => {
  dispatch(startLoading())
  dispatch({ type: CREATE_USER_LIST })

  try {
    const response = await axios.post(`/api/list/create/`, params, tokenConfig(token))
    dispatch({
      type: CREATE_USER_LIST_SUCCESS,
      payload: response.data
    })
    dispatch({
      type: ON_UPDATE_LIST,
      payload: response.data
    })
    cb()
  } catch (error) {
    dispatch({
      type: CREATE_USER_LIST_ERROR,
      payload: error.response
    })
  }

  dispatch(stopLoading())
}

const updateList = (params, token, cb) => async dispatch => {
  dispatch(startLoading())
  dispatch({ type: EDIT_USER_LIST })

  try {
    const response = await axios.post(`/api/list/update/`, params, tokenConfig(token))
    dispatch({
      type: EDIT_USER_LIST_SUCCESS,
      payload: response.data
    })

    dispatch({
      type: ON_UPDATE_LIST,
      payload: response.data
    })
    cb()
  } catch (error) {
    dispatch({
      type: EDIT_USER_LIST_ERROR,
      payload: error.response
    })
  }

  dispatch(stopLoading())
}

const deleteList = (listId, cb) => async dispatch => {
  dispatch(startLoading())
  dispatch({ type: DELETE_USER_LIST })

  try {
    const response = await axios.delete(`/api/list-entries/${listId}`)
    dispatch({
      type: DELETE_USER_LIST_SUCCESS,
      payload: response.data
    })
    cb()
  } catch (error) {
    dispatch({
      type: DELETE_USER_LIST_ERROR,
      payload: error.response
    })
  }

  dispatch(stopLoading())
}

const setLitItemsAction = params => async dispatch => {
  dispatch({ type: EDIT_USER_LIST })

  try {
    dispatch({
      type: ON_UPDATE_LIST,
      payload: params
    })
  } catch (error) {
    dispatch({
      type: EDIT_USER_LIST_ERROR,
      payload: null
    })
  }
}

const getInvitesLists = params => async (dispatch, getState) => {
  dispatch(startLoading())
  try {
    const response = await axios.post(`/api/list/list`, params, tokenConfig(getState()?.Auth.token))
    dispatch({
      type: GET_INVITES_LIST,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_INVITES_LIST_ERROR,
      payload: error.response
    })
  }

  dispatch(stopLoading())
}

export { createList, updateList, deleteList, setLitItemsAction, getInvitesLists }
