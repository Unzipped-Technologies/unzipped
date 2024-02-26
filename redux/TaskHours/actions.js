import {
  CREATE_TASK_HOUR,
  UPDATE_TASK_HOUR,
  GET_TASK_HOURS,
  DELETE_TASK_HOUR,
  GET_TASK_HOUR_BY_ID,
  LOAD_STATE,
  SUCCESS,
  TASK_HOUR_ERROR
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const createTaskHour = data => async (dispatch, getState) => {
  dispatch(startLoading())

  const taskHours = await axios
    .post(`/api/taskHours/create`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: CREATE_TASK_HOUR,
        payload: res.data
      })
      return res?.data?.data
    })
    .catch(err => {
      dispatch({
        type: TASK_HOUR_ERROR,
        payload: err.response
      })
      return err
    })
  dispatch(stopLoading())
  return taskHours
}

export const getTaskHour =
  ({ businessId, freelancerId = '', limit = 25, page = 1 }) =>
  async (dispatch, getState) => {
    dispatch(startLoading())

    await axios
      .get(
        `/api/taskHours?businessId=${businessId}&freelancerId=${freelancerId}&limit=${limit}&page=${page}`,
        tokenConfig(getState()?.Auth.token)
      )
      .then(res => {
        dispatch({
          type: GET_TASK_HOURS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: TASK_HOUR_ERROR,
          payload: err.response
        })
      })
    dispatch(stopLoading())
  }

export const getTaskHourById = taskHourID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .get(`/api/taskHours/${taskHourID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_TASK_HOUR_BY_ID,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_HOUR_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateTaskHour = (taskHourID, data) => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/taskHours/${taskHourID}`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: UPDATE_TASK_HOUR,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_HOUR_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deleteTaskHour = taskHourID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/taskHours/${taskHourID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_TASK_HOUR,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_HOUR_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}
