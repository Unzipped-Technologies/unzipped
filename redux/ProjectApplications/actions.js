import {
  CREATE_PROJECT_APPLICATION,
  UPDATE_PROJECT_APPLICATION,
  DELETE_PROJECT_APPLICATION,
  GET_PROJECT_APPLICATIONS,
  GET_PROJECT_APPLICATION_BY_ID,
  PROJECT_APPLICATION_ERROR,
  SHOW_SUCCESS_NOTIFICATION
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const createProjectApplication = data => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post(`/api/projectApplication`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: SHOW_SUCCESS_NOTIFICATION,
        payload: null
      })
      dispatch({
        type: CREATE_PROJECT_APPLICATION,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(stopLoading())
      dispatch({
        type: PROJECT_APPLICATION_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getProjectApplications =
  ({ projectId, freelancerId = '', limit = 25, page = 1 }) =>
  async (dispatch, getState) => {
    dispatch(startLoading())

    await axios
      .get(
        `/api/projectApplication?projectId=${projectId}&freelancerId=${freelancerId}&limit=${limit}&page=${page}`,
        tokenConfig(getState()?.Auth.token)
      )
      .then(res => {
        dispatch({
          type: GET_PROJECT_APPLICATIONS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: PROJECT_APPLICATION_ERROR,
          payload: err.response
        })
      })
    dispatch(stopLoading())
  }

export const getProjectApplicationById = applicationID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .get(`/api/projectApplication/${applicationID}`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_PROJECT_APPLICATION_BY_ID,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: PROJECT_APPLICATION_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateProjectApplication = (applicationID, data) => async (dispatch, getState) => {
  dispatch(startLoading())

  const formData = ConverterUtils.toFormData(data)

  await axios
    .patch(`/api/projectApplication/${applicationID}`, formData, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: UPDATE_PROJECT_APPLICATION,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: PROJECT_APPLICATION_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deleteProjectApplication = applicationID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/projectApplication/${applicationID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_PROJECT_APPLICATION,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: PROJECT_APPLICATION_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}
