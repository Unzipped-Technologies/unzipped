import axios from 'axios'
import {
  CREATE_CALENDER_SETTING,
  CREATE_CALENDER_SETTING_SUCCESS,
  CREATE_CALENDER_SETTING_ERROR,
  GET_CALENDER_SETTING_ERROR,
  GET_CALENDER_SETTING_SUCCESS
} from './CalenderSettingConstant'
import { startLoading, stopLoading } from '../Loading/actions'
import { tokenConfig } from '../../services/tokenConfig'

const createCalenderSetting = params => async dispatch => {
  dispatch(startLoading())
  dispatch({ type: CREATE_CALENDER_SETTING })

  try {
    const response = await axios.post(`/api/calender/`, params)
    dispatch({
      type: CREATE_CALENDER_SETTING_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: CREATE_CALENDER_SETTING_ERROR,
      payload: error.response
    })
  }

  dispatch(stopLoading())
}

const getCalenderSetting = () => async (dispatch, getState) => {
  dispatch(startLoading())
  try {
    const response = await axios.get(`/api/calender/`, tokenConfig(getState()?.Auth.token))
    dispatch({
      type: GET_CALENDER_SETTING_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_CALENDER_SETTING_ERROR,
      payload: error.response
    })
  }

  dispatch(stopLoading())
}

const resetCalenderSetting = () => async (dispatch, getState) => {
  dispatch(startLoading())
  try {
    dispatch({
      type: GET_CALENDER_SETTING_SUCCESS,
      payload: null
    })
  } catch (error) {
    dispatch({
      type: GET_CALENDER_SETTING_ERROR,
      payload: error ?? 'Something went wrong'
    })
  }

  dispatch(stopLoading())
}

export { createCalenderSetting, getCalenderSetting, resetCalenderSetting }
