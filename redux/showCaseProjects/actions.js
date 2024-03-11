import {
  CREATE_SHOWCASE_PROJECT,
  GET_SHOWCASE_PROJECTS,
  GET_SHOWCASE_PROJECT_BY_ID,
  UPDATE_SHOWCASE_PROJECT,
  DELETE_SHOWCASE_PROJECT,
  SHOWCASE_PROJECT_ERROR
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const createShowCaseProject = data => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post(`/api/showcaseproject`, data, tokenConfig(getState()?.Auth.token, 'multipart'))
    .then(res => {
      dispatch({
        type: CREATE_SHOWCASE_PROJECT,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: SHOWCASE_PROJECT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getShowCaseProjects =
  ({ projectId, freelancerId = '', limit = 25, page = 1 }) =>
  async (dispatch, getState) => {
    dispatch(startLoading())

    await axios
      .get(
        `/api/showcaseproject?projectId=${projectId}&freelancerId=${freelancerId}&limit=${limit}&page=${page}`,
        tokenConfig(getState()?.Auth.token)
      )
      .then(res => {
        dispatch({
          type: GET_SHOWCASE_PROJECTS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: SHOWCASE_PROJECT_ERROR,
          payload: err.response
        })
      })
    dispatch(stopLoading())
  }

export const getShowCaseProjectById = projectID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .get(`/api/showcaseproject/${projectID}`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_SHOWCASE_PROJECT_BY_ID,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: SHOWCASE_PROJECT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateShowCaseProject = (projectID, data) => async (dispatch, getState) => {
  dispatch(startLoading())

  const formData = ConverterUtils.toFormData(data)

  await axios
    .patch(`/api/showcaseproject/${projectID}`, formData, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: UPDATE_SHOWCASE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: SHOWCASE_PROJECT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deleteShowCaseProject = projectID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/showcaseproject/${projectID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_SHOWCASE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: SHOWCASE_PROJECT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deleteProjectImage = (projectID, imageId) => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/showcaseproject/${projectID}/image/${imageId}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_SHOWCASE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: SHOWCASE_PROJECT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}
