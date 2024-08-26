import {
  LOGIN_USER,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  LOGOUT_USER,
  REGISTER_USER,
  SET_TOKEN,
  CURRENT_USER,
  RESET_REGISTER_FORM,
  SIGN_UP_FOR_NEWSLETTER,
  FORGET_PASSWORD,
  FORGET_PASSWORD_SUCCESS,
  CLEAR_ERRORS,
  SET_LOADING,
  SUBSCRIPTION_CREATED,
  UPDATE_USER_SUCCESS,
  LOGGED_OUT,
  UPDATE_REGISTER_FORM,
  UPDATE_REGISTER_CREDENTIALS,
  SELECT_A_PLAN,
  VERIFY_USER,
  INITIATE_VERIFY_IDENTITY,
  UPDATE_SUBSCRIPTION_FORM,
  USER_CREDENTIALS,
  GET_USER_THIRD_PARTY_DETAILS,
  GET_USER_THIRD_PARTY_DETAILS_FAILED,
  UPDATE_USER_EMAIL,
  UPDATE_EMAIL_ERROR,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  UPDATE_USER_ERROR,
  USER_MAIL_CONFIRMATION,
  UPDATE_PHONE_NUMBER,
  UPDATE_PHONE_ERROR,
  HANDLE_USER_EMAIL_REG_ERR
} from './constants'
import _ from 'lodash'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { resetCalenderSetting } from '../actions'

export const loginUser = async dispatch => {
  dispatch({ type: USER_LOADING })
  const response = axios.post().then(r => r)
  dispatch({ type: LOGIN_USER, payload: new Promise(response) })
}

export const userLogin = () => async (dispatch, getState) => {
  _.chain(getState().user)
}
export const loginUserSuccess = user => ({
  type: LOGIN_USER_SUCCESS,
  payload: user
})

export const logoutUser = token => async (dispatch, getState) => {
  await axios.get(`/api/auth/logout`, tokenConfig(token)).then(res =>
    dispatch({
      type: LOGOUT_USER
    })
  )
}

export const signUpForNewsletter = data => async (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  })
  await axios.post(`/api/user/newsletter/add`, data).then(res =>
    dispatch({
      type: SIGN_UP_FOR_NEWSLETTER,
      payload: res.data
    })
  )
}

export const userPayment = () => async (dispatch, getState) => {
  dispatch({
    type: CURRENT_USER,
    payload: getState().Booking.orderDetails
  })
}

export const selectAPlan = data => async dispatch => {
  dispatch({
    type: SELECT_A_PLAN,
    payload: data
  })
}

export const updateSubscriptionForm = data => async dispatch => {
  dispatch({
    type: UPDATE_SUBSCRIPTION_FORM,
    payload: data
  })
}

export const tokenSet = token => async dispatch => {
  await dispatch({
    type: SET_TOKEN,
    payload: token
  })
}

export const updateRegisterForm = data => async dispatch => {
  await dispatch({
    type: UPDATE_REGISTER_FORM,
    payload: data
  })
}

export const updateRegistrationCredentials = email => async dispatch => {
  await dispatch({
    type: UPDATE_REGISTER_CREDENTIALS,
    payload: email
  })
}

export const resetRegisterForm = () => async dispatch => {
  await dispatch({
    type: RESET_REGISTER_FORM
  })
}

export const loginUserFailed = error => ({
  type: LOGIN_USER_FAILED,
  payload: error
})

export const reloadLogout = () => ({
  type: LOGGED_OUT
})

export const updateUserEmail = data => async (dispatch, getState) => {
  const response = await axios
    .patch(`/api/user/change-email`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: UPDATE_USER_EMAIL,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: UPDATE_EMAIL_ERROR,
        payload: err?.response?.data?.msg
      })
      return err?.response
    })
  return response
}

export const updatePhoneNumber = data => async (dispatch, getState) => {
  const response = await axios
    .patch(`/api/user/change-phone`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: UPDATE_PHONE_NUMBER,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: UPDATE_PHONE_ERROR,
        payload: err?.response?.data?.msg
      })
      return err?.response
    })
  return response
}

export const updateUser = (data, token) => async (dispatch, getState) => {
  await axios
    .post(`/api/user/current/update`, data, tokenConfig(token))
    .then(res =>
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data
      })
    })
}

export const getVerifyIdentityUrl =
  (accountId = null, token) =>
  async (dispatch, getState) => {
    await axios
      .post(`/api/stripe/verify-identity`, { id: accountId }, tokenConfig(getState().Auth.token))
      .then(res =>
        dispatch({
          type: INITIATE_VERIFY_IDENTITY,
          payload: res.data
        })
      )
      .catch(err => {
        dispatch({
          type: AUTH_ERROR,
          payload: err.response.data
        })
      })
  }

export const resendVerify = user => async (dispatch, getState) => {
  const data = await axios
    .post(`/api/auth/resend`, user, tokenConfig(getState().Auth.token))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data
      })
    })
  return data
}
//Check token & Load User
export const getCurrentUserData = () => async (dispatch, getState) => {
  // dispatch({ type: USER_LOADING })
  await axios
    .get(`/api/auth/current_user`, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(err => {
      // dispatch(returnErrors(err.response, err.response))
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data
      })
    })
}

//Check token & Load User
export const loadUser = user => async (dispatch, getState) => {
  //User Loading
  dispatch(resetCalenderSetting())
  dispatch({ type: USER_LOADING })
  return await axios
    .post(`/api/auth/login`, user)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response
      })
      return err
    })
}

//Check token & Load User

//Check token & Load User
export const createSubscription = (data, token) => async (dispatch, getState) => {
  dispatch({ type: SET_LOADING })
  await axios
    .post(`/api/payment/subscription/create`, data, tokenConfig(token))
    .then(res =>
      dispatch({
        type: SUBSCRIPTION_CREATED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response
      })
    })
}

export const registerUser = user => async dispatch => {
  //User Loading
  dispatch({ type: USER_LOADING })

  const response = await axios.post(`/api/auth/register`, user)
  if (response.status === 200) {
    dispatch({
      type: REGISTER_USER,
      payload: response.data
    })
    dispatch({
      type: VERIFY_USER
    })
  }
  if (response.status !== 200) {
    dispatch({
      type: AUTH_ERROR,
      payload: { data: response.data }
    })
  }
}

export const verifyUser = user => async dispatch => {
  dispatch({ type: USER_LOADING })
  dispatch({
    type: USER_CREDENTIALS,
    payload: user
  })

  await axios
    .post(`/api/auth/verify`, user)
    .then(res => {
      dispatch({
        type: VERIFY_USER
      })
    })
    .catch(err => {
      dispatch({
        type: AUTH_ERROR,
        payload: { data: err.response.data.message }
      })
    })
}

export const forgotPassword = user => async (dispatch, getState) => {
  //User Loading
  dispatch({ type: USER_LOADING })

  await axios
    .post(`/api/auth/reset`, user)
    .then(res =>
      dispatch({
        type: FORGET_PASSWORD,
        payload: res.data
      })
    )
    .catch(err => {
      // dispatch(returnErrors(err.response, err.response))
      dispatch({
        type: AUTH_ERROR,
        payload: err.response
      })
    })
}

//Check token & Load User
export const googleUser = token => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  await axios
    .get(`/api/auth/current_user`, tokenConfig(token))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      // dispatch(returnErrors(err.response, err.response))
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data
      })
    })
}

export const changePassword = data => async (dispatch, getState) => {
  //User Loading
  const response = await axios
    .post(`/api/auth/change-password`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: err.response
      })
      return err.response
    })
  return response
}

export const contactEmail = contact => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  await axios
    .post(`/api/auth/contact`, contact)
    .then(res =>
      dispatch({
        type: SET_TOKEN,
        payload: res.data
      })
    )
    .catch(err => {
      // dispatch(returnErrors(err.response, err.response))
      dispatch({
        type: SET_TOKEN,
        payload: err.response
      })
    })
}

export const mailingList = data => async (dispatch, getState) => {
  dispatch({ type: USER_LOADING })
  await axios
    .post(`/api/auth/addMailing`, data)
    .then(res =>
      dispatch({
        type: SET_TOKEN,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: SET_TOKEN,
        payload: err.response
      })
    })
}

export const getUserById = id => async dispatch => {
  try {
    const resp = await axios.get(`/api/user/thirdPartyCredentials/${id}`)
    if (resp) {
      dispatch({
        type: GET_USER_THIRD_PARTY_DETAILS,
        payload: resp.data
      })
    }
  } catch (error) {
    dispatch({
      type: GET_USER_THIRD_PARTY_DETAILS_FAILED,
      payload: error.response
    })
  }
}

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}

export const updateCurrentUser = data => async (dispatch, getState) => {
  const response = await axios
    .post(`/api/user/update`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: res.data
      })
      return res
    })
    .catch(err => {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: err.response
      })
      return err.response
    })
  return response
}

export const emailConfirmation = userId => async dispatch => {
  const response = await axios.get(`/api/auth/verify/${userId}`)
  if (response.status === 200) {
    dispatch({
      type: USER_MAIL_CONFIRMATION,
      payload: true
    })
  }

  if (response.status !== 200) {
    dispatch({
      type: USER_MAIL_CONFIRMATION,
      payload: false
    })
  }
}

export const handleEmailRegistration = () => dispatch => {
  dispatch({
    type: HANDLE_USER_EMAIL_REG_ERR,
    payload: { loading: false }
  })
}
