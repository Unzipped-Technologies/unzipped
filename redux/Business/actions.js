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
  SUBMIT_PROJECT_WIZARD_DETAILS_ERROR,
  SUBMIT_PROJECT_WIZARD_DETAILS_SUCCESS,
  UPDATE_WIZARD_SUBMISSION,
  SET_IS_BUSINESS_FIELD_SUBMITTED,
  SET_PROJECT_FILES,
  RESET_PROJECT_FILES,
  GET_BUSINESS_DETAILS,
  GET_BUSINESS_CREATED_BY_USER,
  GET_BUSINESS_CREATED_BY_USER_SUCCESS,
  GET_BUSINESS_CREATED_BY_USER_FAILED,
  GET_BUSINESS_EMPLOYEES,
  GET_BUSINESS_EMPLOYEES_FAILED,
  RESET_HIRED_EMPLOYEES,
  RESET_HIRED_EMPLOYEES_FAILED,
  GET_BUSINESS_INFO_TASKLIST_PANEL,
  LOAD_BUSINESS_ASSOCIATED_TASK_FULL_VIEW,
  REST_BUSINESS_LIST,
  LOAD_BUSINESS_ASSOCIATED_TASK_FULL_VIEW_ERROR
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'

export const updateBusinessForm = data => async (dispatch, getState) => {
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

export const getBusinessDetails = userId => async (dispatch, getState) => {
  const id = userId || getState().Auth.user._id
  dispatch({ type: LOAD_STATE })
  await axios
    .post(`/api/business/details`, { userId: getState().Auth.user._id }, tokenConfig(getState()?.Auth.token))
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

export const createBusiness =
  (data, isWizard = false) =>
  async (dispatch, getState) => {
    dispatch({ type: LOAD_STATE })
    dispatch(startLoading())
    await axios
      .post(`/api/business/create`, data, tokenConfig(getState()?.Auth.token, 'multipart'))
      .then(async res => {
        dispatch({
          type: CREATE_BUSINESS,
          payload: { projectName: res.data?.business?.name, isSuccessfull: true }
        })
        if (isWizard) {
          dispatch({
            type: SUBMIT_PROJECT_WIZARD_DETAILS_SUCCESS,
            payload: { projectName: res.data?.business?.name, isSuccessfull: true }
          })
        }
        dispatch({ type: RESET_BUSINESS_FORM })
      })
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

export const nullBusinessForm =
  (data = {}) =>
  dispatch => {
    dispatch({
      type: RESET_BUSINESS_FORM
    })
  }

export const updateWizardSubmission = data => dispatch => {
  dispatch({
    type: UPDATE_WIZARD_SUBMISSION,
    payload: data
  })
}
export const getProjectsList = queryParams => async (dispatch, getState) => {
  await dispatch({
    type: GET_PROJECT_LIST,
    payload: { limitedRecords: [], totalCount: [{ count: 0 }] }
  })
  await dispatch(startLoading())
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
    .finally(() => {
      dispatch(stopLoading())
    })
}

export const getPublicProjectsList = queryParams => async (dispatch, getState) => {
  await dispatch({
    type: GET_PROJECT_LIST,
    payload: { limitedRecords: [], totalCount: [{ count: 0 }] }
  })
  await dispatch(startLoading())
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
    .finally(() => {
      dispatch(stopLoading())
    })
}

export const getBusinessById = id => async (dispatch, getState) => {
  //business list Loading
  await dispatch(startLoading())

  await dispatch({
    type: SELECT_BUSINESS,
    payload: null
  })
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
  await dispatch(stopLoading())
}

export const businessFieldsValidation = data => dispatch => {
  dispatch({
    type: SET_IS_BUSINESS_FIELD_SUBMITTED,
    payload: data
  })
}

export const setProjectFiles = data => dispatch => {
  dispatch({
    type: SET_PROJECT_FILES,
    payload: data
  })
}

export const resetProjectFiles = () => dispatch => {
  dispatch({
    type: RESET_PROJECT_FILES
  })
}

export const getUserOwnedBusiness = (userId, token) => async (dispatch, getState) => {
  try {
    await dispatch(startLoading())

    const apiResponse = await axios.get(
      `/api/business/user-owned-business/${userId}`,
      tokenConfig(getState()?.Auth.token)
    )
    if (apiResponse?.status === 200) {
      dispatch({
        type: GET_BUSINESS_CREATED_BY_USER_SUCCESS,
        payload: apiResponse.data
      })
    }
    await dispatch(stopLoading())
  } catch (error) {
    dispatch({
      type: GET_BUSINESS_CREATED_BY_USER_FAILED,
      payload: error.message
    })
    await dispatch(stopLoading())
  }
}

export const getBusinessEmployees =
  (businessId, isSelectedBusiness = false) =>
  async (dispatch, getState) => {
    try {
      await dispatch(startLoading())

      const response = await axios.get(
        `/api/business/get-business-employees/${businessId}?&isSelectedBusiness=${isSelectedBusiness}`,
        tokenConfig(getState()?.Auth.token)
      )
      if (response?.status === 200) {
        dispatch({
          type: GET_BUSINESS_EMPLOYEES,
          payload: response.data
        })
      }
      await dispatch(stopLoading())
    } catch (error) {
      dispatch({
        type: GET_BUSINESS_EMPLOYEES_FAILED,
        payload: error.message
      })
      await dispatch(stopLoading())
    }
  }

export const resetHiredEmployees = () => (dispatch, getState) => {
  try {
    dispatch({
      type: RESET_HIRED_EMPLOYEES,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: RESET_HIRED_EMPLOYEES_FAILED,
      payload: error.message
    })
  }
}

export const loadAllBusinessAssociatedTickets =
  (businessId, departmentId, isDepartmentRelatedTasks) => async (dispatch, getState) => {
    dispatch(startLoading())
    try {
      const response = await axios.get(
        `/api/business/fetch-all-biz-tasks/${businessId}?departmentId=${departmentId}&isDepartmentRelatedTasks=${isDepartmentRelatedTasks}`,
        tokenConfig(getState()?.Auth.token)
      )
      if (response?.status === 200) {
        dispatch({
          type: LOAD_BUSINESS_ASSOCIATED_TASK_FULL_VIEW,
          payload: response.data
        })
      }
    } catch (error) {
      dispatch({
        type: LOAD_BUSINESS_ASSOCIATED_TASK_FULL_VIEW_ERROR,
        payload: error.message
      })
    }
    await dispatch(stopLoading())
  }

export const resetBusinessList = () => dispatch => {
  dispatch(startLoading())
  dispatch({
    type: REST_BUSINESS_LIST,
    payload: []
  })

  dispatch(stopLoading())
}
