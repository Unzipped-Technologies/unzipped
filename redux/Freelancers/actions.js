import {
  FREELANCER_LOADING,
  GET_ALL_FREELANCERS,
  GET_FREELANCER_BY_ID,
  CREATE_SHOWCASE_PROJECT,
  ADD_EDUCATION,
  DELETE_SHOWCASE_PROJECT,
  DELETE_EDUCATION,
  RESET_SELECTED_FREELANCER,
  FREELANCER_ERROR,
  CREATE_USER_INVITATION_SUCCESS,
  CREATE_USER_INVITATION_ERROR,
  SETNAVBAR
} from './constants'
import _ from 'lodash'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'

export const getFreelancerList = (queryParams, token) => async (dispatch, getState) => {
  dispatch({
    type: FREELANCER_LOADING
  })
  dispatch(startLoading())

  const headers = {
    access_token: token
  }

  try {
    const response = await axios.get(`/api/user/freelancer/list`, {
      headers,
      params: queryParams
    })
    dispatch({
      type: GET_ALL_FREELANCERS,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: FREELANCER_ERROR,
      payload: err.response
    })
  }
  dispatch(stopLoading())
}

export const getFreelancerById = id => async (dispatch, getState) => {
  await dispatch({
    type: GET_FREELANCER_BY_ID,
    payload: null
  })
  await dispatch(startLoading())

  await axios
    .get(`/api/freelancer/${id}`)
    .then(res => {
      dispatch({
        type: GET_FREELANCER_BY_ID,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
    })
  await dispatch(stopLoading())
}

export const addEducation = data => async (dispatch, getState) => {
  dispatch({
    type: FREELANCER_LOADING
  })
  await axios
    .post(`/api/freelancer/add-education`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: ADD_EDUCATION,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
    })
}

export const deleteEducation = educationId => async (dispatch, getState) => {
  dispatch({
    type: FREELANCER_LOADING
  })
  const response = await axios
    .delete(`/api/freelancer/delete-education/${educationId}`, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: DELETE_EDUCATION,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
      return err
    })
  return response
}

export const getAllFreelancers = queryParams => async dispatch => {
  dispatch({
    type: GET_ALL_FREELANCERS,
    payload: { limitedRecords: [], totalCount: [{ count: 0 }] }
  })
  await dispatch(startLoading())
  await axios
    .post(`/api/freelancer/public/list`, queryParams)
    .then(res => {
      dispatch({
        type: GET_ALL_FREELANCERS,
        payload: res?.data
      })
    })
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
    })
  await dispatch(stopLoading())
}

export const createUserInvitation = (params, filter) => async dispatch => {
  dispatch(startLoading())
  try {
    const response = await axios.post(`api/freelancer/create-invite`, params)
    dispatch({ type: CREATE_USER_INVITATION_SUCCESS, payload: response.data })
    dispatch(getAllFreelancers({ filter }))
  } catch (error) {
    dispatch({
      type: CREATE_USER_INVITATION_ERROR,
      payload: error
    })
  }
  dispatch(stopLoading())
}

export const clearSelectedFreelancer = () => async (dispatch, getState) => {
  dispatch({
    type: RESET_SELECTED_FREELANCER
  })
}

export const freelancerExpandedOpts = params => dispatch => {
  dispatch({ type: SETNAVBAR, payload: params })
}

export const createShowCaseProject = data => async (dispatch, getState) => {
  await dispatch(startLoading())
  await axios
    .post(`/api/freelancer/add-project`, data, tokenConfig(getState()?.Auth.token, 'multipart'))
    .then(res => {
      dispatch({
        type: CREATE_SHOWCASE_PROJECT,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
    })
  await dispatch(stopLoading())
}

export const deleteShowCaseProject = projectID => async (dispatch, getState) => {
  await dispatch(startLoading())

  const response = await axios
    .delete(`/api/freelancer/delete-project/${projectID}`, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: DELETE_SHOWCASE_PROJECT,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
      return err
    })
  await dispatch(stopLoading())
  return response
}

export const deleteProjectImage = (projectID, imageId) => async (dispatch, getState) => {
  await dispatch(startLoading())

  await axios
    .patch(`/api/freelancer/${projectID}/image/${imageId}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_SHOWCASE_PROJECT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
    })
  await dispatch(stopLoading())
}

export const updateFreelancerSkills = data => async (dispatch, getState) => {
  await dispatch(startLoading())

  const response = await axios
    .post(`/api/freelancer/update-skills`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: DELETE_SHOWCASE_PROJECT,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
      return err
    })
  await dispatch(stopLoading())
  return response
}

export const deleteFreelancerSkill = skillId => async (dispatch, getState) => {
  await dispatch(startLoading())

  const response = await axios
    .delete(`/api/freelancer/delete-skill/${skillId}`, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: DELETE_SHOWCASE_PROJECT,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: FREELANCER_ERROR,
        payload: err.response
      })
      return err
    })
  await dispatch(stopLoading())
  return response
}
