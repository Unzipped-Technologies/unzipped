import {
  CREATE_CALENDER_SETTING,
  CREATE_CALENDER_SETTING_SUCCESS,
  CREATE_CALENDER_SETTING_ERROR,
  CREATE_CALENDER_SETTING_LOADING,
  GET_CALENDER_SETTING_SUCCESS,
  GET_CALENDER_SETTING_ERROR,
  HIDE_CALENDER_SUCCESS_NOTIFICATION
} from './CalenderSettingConstant'

const INIT_STATE = {
  calenderSetting: null,
  success: null,
  loading: false,
  error: null
}

const CalenderSetting = (state = INIT_STATE, action) => {
  switch (action.type) {
    case CREATE_CALENDER_SETTING_LOADING:
      return { ...state, loading: true }
    case CREATE_CALENDER_SETTING:
      return {
        ...state,
        loading: false,
        error: null
      }
    case CREATE_CALENDER_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        success: action.payload?._id ? true : null,
        calenderSetting: action.payload
      }
    case GET_CALENDER_SETTING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        calenderSetting: action.payload
      }
    case CREATE_CALENDER_SETTING_ERROR:
      return { ...state, loading: false, error: action.payload, success: false }
    case GET_CALENDER_SETTING_ERROR:
      return { ...state, loading: false, error: action.payload, success: null }
    case HIDE_CALENDER_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: null
      }
    default:
      return state
  }
}

export default CalenderSetting
