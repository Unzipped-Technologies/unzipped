import {
  CREATE_TASK,
  UPDATE_TASK,
  GET_TASKS,
  DELETE_TASK,
  GET_TASK_BY_ID,
  LOAD_STATE,
  TASK_ORDER,
  SUCCESS,
  ADD_COMMENT_TO_STORY,
  UPDATE_CREATE_STORY,
  TASK_ERROR,
  SET_DEPARTMENT,
  REORDER_STORIES,
  SET_CURRENT_TICKET,
  RESET_STORY_FORM,
  REMOVE_COMMENT_FROM_STORY,
  REST_TAGS_LIST
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const createTask = data => async (dispatch, getState) => {
  dispatch(startLoading())

  const newTask = await axios
    .post(`/api/tasks`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: CREATE_TASK,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: TASK_ERROR,
        payload: err.response
      })

      return err?.response
    })
  dispatch(stopLoading())
  return newTask
}

export const getTasks =
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
  const updatedTask = await axios
    .patch(`/api/tasks/${taskID}`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: UPDATE_TASK,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: TASK_ERROR,
        payload: err.response
      })
      return err
    })
  dispatch(stopLoading())
  return updatedTask
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
}

export const reorderStories = (data, token) => async (dispatch, getState) => {
  dispatch({
    type: REORDER_STORIES,
    payload: data
  })
  dispatch({ type: LOAD_STATE })
  await axios
    .post(`/api/tasks/order`, data, tokenConfig(getState()?.Auth.token))
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

export const removeCommentFromStory = comentId => async (dispatch, getState) => {
  //story Loading
  dispatch({ type: LOAD_STATE })

  await axios
    .delete(`/api/tasks/comment/delete/${comentId}`, data, tokenConfig(getState()?.Auth.token))
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

export const updateCreateStoryForm = data => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_CREATE_STORY,
    payload: data
  })
}

export const resetStoryForm = () => async (dispatch, getState) => {
  dispatch({
    type: RESET_STORY_FORM,
    payload: {}
  })
}

export const addCommentToStory = data => async (dispatch, getState) => {
  //story Loading
  dispatch({ type: LOAD_STATE })
  const formData = ConverterUtils.toFormData(data)

  await axios
    .post(`/api/tasks/comment/add`, formData, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: ADD_COMMENT_TO_STORY,
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

export const setDepartment = data => async (dispatch, getState) => {
  dispatch({
    type: SET_DEPARTMENT,
    payload: data
  })
}

export const updateComment = (taskId, commentId, data) => async (dispatch, getState) => {
  //story Loading
  dispatch({ type: LOAD_STATE })
  const formData = ConverterUtils.toFormData(data)

  await axios
    .patch(`/api/tasks/${taskId}/comment/${commentId}`, formData, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: ADD_COMMENT_TO_STORY,
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


export const restTagsList = () => (dispatch, getState) => {
  dispatch({
    type: REST_TAGS_LIST,
  })
}