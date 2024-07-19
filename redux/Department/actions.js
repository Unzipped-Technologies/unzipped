import {
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_DEPARTMENTS,
  GET_DEPARTMENT_BY_ID,
  UPDATE_DEPARTMENT_FORM,
  RESET_DEPARTMENT_FORM,
  DEPARTMENT_ERROR,
  LOAD_STATE,
  UPDATE_DEPARTMENT_INFO,
  UPDATE_TASK_STATUS_ON_DRAG,
  UPDATE_TASK_STATUS_ON_DRAG_ERROR
} from './constants'
import axios from 'axios'
import { startLoading, stopLoading } from '../Loading/actions'

import { tokenConfig } from '../../services/tokenConfig'

export const createDepartment = data => async (dispatch, getState) => {
  //department Loading
  dispatch({ type: LOAD_STATE })

  await axios
    .post(`/api/department`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: CREATE_DEPARTMENT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: DEPARTMENT_ERROR,
        payload: err.response
      })
    })
}

export const getDepartmentsForBusiness = (data, token) => async (dispatch, getState) => {
  //business list Loading
  dispatch({ type: LOAD_STATE })

  await axios
    .post(`/api/department`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_DEPARTMENTS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: DEPARTMENT_ERROR,
        payload: err.response
      })
    })
}

export const getDepartmentById = (id, isEditingDepartment = false) => async (dispatch, getState) => {
  //department list Loading
  dispatch({
    type: GET_DEPARTMENT_BY_ID,
    payload: null
  })
  dispatch(startLoading())

  await axios
    .get(`/api/department/${id}?isEditingDepartment=${isEditingDepartment}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_DEPARTMENT_BY_ID,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: DEPARTMENT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

// TODO update department BE route and action
export const updateDepartment = (data, departmentId, isEditingDepartment = false) => async (dispatch, getState) => {
  //department Loading
  dispatch({ type: LOAD_STATE })

  await axios
    .patch(`/api/department/${departmentId}?isEditingDepartment=${isEditingDepartment}`, data, tokenConfig(getState()?.Auth.token))
    .then(res => dispatch({
      type: UPDATE_DEPARTMENT_INFO,
      payload: res.data,
    }))
    .catch(err => {
      dispatch({
        type: DEPARTMENT_ERROR,
        payload: err.response
      })
    })
}

export const deleteDepartment = departmentId => async (dispatch, getState) => {
  //department Loading
  dispatch({ type: LOAD_STATE })

  await axios
    .delete(`/api/department/${departmentId}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_DEPARTMENT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: DEPARTMENT_ERROR,
        payload: err.response
      })
    })
}

export const updateDepartmentForm = data => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_DEPARTMENT_FORM,
    payload: data
  })
}

export const resetDepartmentForm = () => async (dispatch, getState) => {
  dispatch({
    type: RESET_DEPARTMENT_FORM,
    payload: {}
  })
}

export const updateStatusOnDrag = (taskId, data) => async (dispatch, getState) => {

  dispatch({ type: LOAD_STATE })

  const response = await axios
    .patch(`/api/tasks/update-task-status-on-drag/${taskId}`,
      data, tokenConfig(getState()?.Auth.token)
    )
  if (response.status === 200) {
    dispatch({
      type: UPDATE_TASK_STATUS_ON_DRAG,
      payload: response.data.data
    })
  }
  else {
    dispatch({
      type: UPDATE_TASK_STATUS_ON_DRAG_ERROR,
      payload: response.data
    })
  }
}