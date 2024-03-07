import {
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_DEPARTMENTS,
  GET_DEPARTMENT_BY_ID,
  DEPARTMENT_ERROR,
  LOAD_STATE
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

export const getDepartmentById = id => async (dispatch, getState) => {
  //department list Loading
  dispatch(startLoading())

  await axios
    .get(`/api/department/${id}`, tokenConfig(getState()?.Auth.token))
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
export const updateDepartment = data => async (dispatch, getState) => {
  //department Loading
  dispatch({ type: LOAD_STATE })

  // await axios
  //     .post(`/api/department/update`, data)
  //     .then(res => dispatch({
  //         type: CREATE_DEPARTMENT,
  //         payload: res.data,
  //     }))
  //     .catch(err => {
  //         dispatch({
  //             type: DEPARTMENT_ERROR,
  //             payload: err.response
  //         })
  //     })
  dispatch({
    type: CREATE_DEPARTMENT,
    payload: data
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
