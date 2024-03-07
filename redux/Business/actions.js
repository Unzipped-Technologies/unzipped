import {
  GET_PROJECT_LIST_AND_APPEND,
  SELECT_BUSINESS,
  CREATE_FILE,
  LOAD_STATE,
  CREATE_BUSINESS,
  UPDATE_BUSINESS,
  ADD_COMMENT_TO_STORY,
  UPDATE_BUSINESS_FORM,
  RESET_BUSINESS_FORM,
  GET_PROJECT_LIST,
  GET_PROJECT_Error,
  BUSINESS_ERROR,
  GET_TASK_HOURS_BY_BUSINESS,
  UPDATE_TASK_HOURS,
  UPDATE_TASK_STATUS,
  CREATE_TASK_AND_TASK_HOURS,
  UPDATE_TASK_HOURS_DATE,
  GET_TASK_HOURS_BY_BUSINESS_BY_FOUNDER,
  SUBMIT_PROJECT_WIZARD_DETAILS,
  SUBMIT_PROJECT_WIZARD_DETAILS_ERROR,
  SUBMIT_PROJECT_WIZARD_DETAILS_SUCCESS,
  UPDATE_WIZARD_SUBMISSION,
  BUSINESS_ERROR
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'

export const updateBusinessForm = (data, token) => async (dispatch, getState) => {
  dispatch({
    type: UPDATE_BUSINESS_FORM,
    payload: data
  })
}

export const createTempFile = (data, token) => async (dispatch, getState) => {
  dispatch({
    type: LOAD_STATE
  })
  var formData = new FormData()
  var imagefile = document.querySelector('#file')
  formData.append('image', data.file)
  formData.append('name', data.name)
  await axios
    .post(`/api/file/create`, data, tokenConfig(token))
    .then(res =>
      dispatch({
        type: CREATE_FILE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: BUSINESS_ERROR,
        payload: err.response
      })
    })
}

export const resetBusinessForm = () => async (dispatch, getState) => {
  dispatch({
    type: RESET_BUSINESS_FORM
  })
}

export const getBusinessDetails = (userId, token) => async (dispatch, getState) => {
  const id = userId || getState().Auth.user._id
  dispatch({ type: LOAD_STATE })
  await axios
    .post(`/api/business/details`, { userId: id }, tokenConfig(token))
    .then(res =>
      dispatch({
        type: GET_BUSINESS_DETAILS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: BUSINESS_ERROR,
        payload: err.response
      })
    })
}

export const createBusiness = (data, token, isWizard = false) => async (dispatch, getState) => {
  dispatch({ type: LOAD_STATE })
  dispatch(startLoading())
  await axios
    .post(`/api/business/create`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        access_token: token
      }
    })
    .then(res => {
      dispatch({
        type: CREATE_BUSINESS,
        payload: res.data
      })
      if (isWizard) {
        dispatch({
          type: SUBMIT_PROJECT_WIZARD_DETAILS_SUCCESS,
          payload: { projectName: res.data?.business?.name, isSuccessfull: true }
        })
      }
      dispatch({ type: RESET_BUSINESS_FORM, })
    }

    )
    .catch(err => {
      dispatch({
        type: BUSINESS_ERROR,
        payload: err.response
      })
      if (isWizard) {
        dispatch({
          type: SUBMIT_PROJECT_WIZARD_DETAILS_ERROR,
          payload: { error: 'Failed', isSuccessfull: false, projectName: '' }
        })
      }
    })
    dispatch(stopLoading())
}

export const updateBusiness = data => async (dispatch, getState) => {
  dispatch({ type: LOAD_STATE })
  const response = await axios
    .post(`/api/business/update`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: UPDATE_BUSINESS,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: BUSINESS_ERROR,
        payload: err.response
      })
      return err?.response
    })
  dispatch(stopLoading())
  return response
}

export const nullBusinessForm = (data = {}) => (dispatch) => {
  dispatch({
    type: RESET_BUSINESS_FORM,
  })
}

export const updateWizardSubmission = (data) => (dispatch) => {
  dispatch({
    type: UPDATE_WIZARD_SUBMISSION,
    payload: data
  })
}
export const getProjectsList = queryParams => async (dispatch, getState) => {
  dispatch({ type: LOAD_STATE })
  await axios
    .post(`/api/business/list`, queryParams, tokenConfig(getState()?.Auth.token))
    .then(res => {
      queryParams?.intersectionObserver
        ? dispatch({
            type: GET_PROJECT_LIST_AND_APPEND,
            payload: res.data
          })
        : dispatch({
            type: GET_PROJECT_LIST,
            payload: res.data
          })
    })
    .catch(err => {
      dispatch({
        type: GET_PROJECT_Error,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getPublicProjectsList = queryParams => async (dispatch, getState) => {
  dispatch({ type: LOAD_STATE })
  await axios
    .post(`/api/business/public/list`, queryParams)
    .then(res => {
      queryParams?.intersectionObserver
        ? dispatch({
            type: GET_PROJECT_LIST_AND_APPEND,
            payload: res.data
          })
        : dispatch({
            type: GET_PROJECT_LIST,
            payload: res.data
          })
    })
    .catch(err => {
      dispatch({
        type: GET_PROJECT_Error,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getBusinessById = id => async (dispatch, getState) => {
  //business list Loading
  dispatch({ type: LOAD_STATE })
  await axios
    .get(`/api/business/${id}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: SELECT_BUSINESS,
        payload: res.data?.getBusiness
      })
    )
    .catch(err => {
      dispatch({
        type: BUSINESS_ERROR,
        payload: err.response
      })
    })
}