import axios from 'axios';
import {
    CREATE_CALENDER_SETTING,
    CREATE_CALENDER_SETTING_SUCCESS,
    CREATE_CALENDER_SETTING_ERROR,
} from './CalenderSettingConstant';
import {
    startLoading,
    stopLoading
} from '../Loading/actions';


const createCalenderSetting = (params) => async (dispatch) => {

    dispatch(startLoading());
    dispatch({ type: CREATE_CALENDER_SETTING });

    try {
        const response = await axios.post(`/api/calender/`, params);
        dispatch({
            type: CREATE_CALENDER_SETTING_SUCCESS,
            payload: response.data
        });

    } catch (error) {
        dispatch({
            type: CREATE_CALENDER_SETTING_ERROR,
            payload: error.response
        });
    }

    dispatch(stopLoading());

}

export {
    createCalenderSetting
}