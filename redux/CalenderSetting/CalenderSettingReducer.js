import {
    CREATE_CALENDER_SETTING,
    CREATE_CALENDER_SETTING_SUCCESS,
    CREATE_CALENDER_SETTING_ERROR,
    CREATE_CALENDER_SETTING_LOADING
} from './CalenderSettingConstant';

const INIT_STATE = {
    calenderSetting: null,
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
                calenderSetting: action.payload
            }
        case CREATE_CALENDER_SETTING_ERROR:
            return { ...state, loading: false, error: action.payload }

        default:
            return state
    }
}

export default CalenderSetting;