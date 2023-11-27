import {
    START_LOADING,
    STOP_LOADING,
} from './constants';

export const startLoading = () => async (dispatch) => {
    dispatch({
        type: START_LOADING,
    })
}

export const stopLoading = () => async (dispatch) => {
    dispatch({
        type: STOP_LOADING,
    })
}