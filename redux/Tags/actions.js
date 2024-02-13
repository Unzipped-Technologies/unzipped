import {
  CREATE_TAG,
  UPDATE_TAG,
  GET_TAG_BY_ID,
  GET_TAGS,
  DELETE_TAG,
  UPDATE_TAG_FORM,
  RESET_TAG_FORM,
  LOAD_STATE,
  SUCCESS,
  TAG_ERROR
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const createTag = data => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .post(`/api/tags`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: CREATE_TAG,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TAG_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getTags =
  ({ businessId, freelancerId = '', limit = 25, page = 1 }) =>
  async (dispatch, getState) => {
    dispatch(startLoading())

    await axios
      .get(
        `/api/tags?businessId=${businessId}&freelancerId=${freelancerId}&limit=${limit}&page=${page}`,
        tokenConfig(getState()?.Auth.token)
      )
      .then(res => {
        dispatch({
          type: GET_TAGS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: TAG_ERROR,
          payload: err.response
        })
      })
    dispatch(stopLoading())
  }

export const getTagById = tagID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .get(`/api/tags/${tagID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_TAG_BY_ID,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TAG_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateTag = (tagID, data) => async (dispatch, getState) => {
  dispatch(startLoading())

  const formData = ConverterUtils.toFormData(data)

  await axios
    .patch(`/api/tags/${tagID}`, formData, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: UPDATE_TAG,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TAG_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deleteTag = tagID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/tags/${tagID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_TAG,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TAG_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateCreateTagForm = data => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_TAG_FORM,
    payload: data
  })
}

export const resetTagForm = () => async (dispatch, getState) => {
  dispatch({
    type: RESET_TAG_FORM,
    payload: {}
  })
}
