import {
  CREATE_TASK,
  UPDATE_TASK,
  GET_TASKS,
  DELETE_TASK,
  GET_TASK_BY_ID,
  LOAD_STATE,
  TASK_ORDER,
  SUCCESS,
  TASK_ERROR,
  REMOVE_COMMENT_FROM_STORY
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const createTask = data => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .post(`/api/tasks`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: CREATE_TASK,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getTask =
  ({ businessId, freelancerId = '', limit = 25, page = 1 }) =>
  async (dispatch, getState) => {
    dispatch(startLoading())

    await axios
      .get(
        `/api/tasks?businessId=${businessId}&freelancerId=${freelancerId}&limit=${limit}&page=${page}`,
        tokenConfig(getState()?.Auth.token)
      )
      .then(res => {
        dispatch({
          type: GET_TASKS,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: TASK_ERROR,
          payload: err.response
        })
      })
    dispatch(stopLoading())
  }

export const getTaskById = taskID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .get(`/api/tasks/${taskID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_TASK_BY_ID,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateTask = (taskID, data) => async (dispatch, getState) => {
  dispatch(startLoading())

  const formData = ConverterUtils.toFormData(data)

  await axios
    .patch(`/api/tasks/${taskID}`, formData, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: UPDATE_TASK,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deleteTask = taskID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/tasks/${taskID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_TASK,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateTasksOrder = (data, token) => async (dispatch, getState) => {
  //tasks Loading
  dispatch({ type: LOAD_STATE })
  dispatch({
    type: TASK_ORDER,
    payload: data
  })
  // await axios
  //     .post(`/api/dashboard/status`, {status, order}, tokenConfig(token))
  //     .then(res => dispatch({
  //         type: SORT_STORIES_ON_DRAG,
  //         payload: res.data,
  //     }))
  //     .catch(err => {
  //         // dispatch(returnErrors(err.response, err.response))
  //         dispatch({
  //             type: UPDATE_ERROR,
  //             payload: err.response
  //         })
  //     })
}

export const reorderStories = (data, token) => async (dispatch, getState) => {
  dispatch({
    type: REORDER_STORIES,
    payload: data
  })
  dispatch({ type: LOAD_STATE })
  await axios
    .post(`/api/business/current/task/order`, data, tokenConfig(token))
    .then(res =>
      dispatch({
        type: SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_ERROR,
        payload: err.response
      })
    })
}

export const removeCommentFromStory = (data, token) => async (dispatch, getState) => {
  //story Loading
  dispatch({ type: LOAD_STATE })

  await axios
    .post(`/api/business/current/task/create`, data, tokenConfig(token))
    .then(res =>
      dispatch({
        type: REMOVE_COMMENT_FROM_STORY,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: TASK_ERROR,
        payload: err.response
      })
    })
}
