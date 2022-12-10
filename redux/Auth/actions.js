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
    SIGN_UP_FOR_NEWSLETTER,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    CLEAR_ERRORS,
    SET_DEFAULT_VEHICLE,
    LOGGED_OUT,
    UPDATE_REGISTER_FORM,
} from './constants';
import _ from 'lodash';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';

export const loginUser = async (dispatch) => {
    dispatch({ type: USER_LOADING })
    const response = axios.post().then((r) => r)
    dispatch({ type: LOGIN_USER, payload: new Promise(response) })
}



export const userLogin = () => async (dispatch, getState) => {
    _.chain(getState().user)
}
export const loginUserSuccess = (user) => ({
    type: LOGIN_USER_SUCCESS,
    payload: user,
});

export const logoutUser = (token) => async (dispatch, getState) => {
    await axios
        .get(`/api/auth/logout`, tokenConfig(token))
        .then(res => dispatch({
            type: LOGOUT_USER,
            })
        )
};

export const signUpForNewsletter = () => async (dispatch, getState) => {
    dispatch({
        type: USER_LOADING
    })
    await axios
        .post(`/api/user/newsletter/add`)
        .then(res => dispatch({
            type: SIGN_UP_FOR_NEWSLETTER,
            payload: res.data
            })
        )
};

export const userPayment = () => async (dispatch, getState) => {
    dispatch({
        type: CURRENT_USER,
        payload: getState().Booking.orderDetails,
        })
};

export const tokenSet = (token) => async (dispatch) => {
    await dispatch({
        type: SET_TOKEN,
        payload: token,
    })
};

export const updateRegisterForm = (data) => ({
    type: UPDATE_REGISTER_FORM,
    payload: data,
});

export const loginUserFailed = (error) => ({
    type: LOGIN_USER_FAILED,
    payload: error,
});

export const reloadLogout = () => ({
    type: LOGGED_OUT
});

export const resendVerify = (user) => async (dispatch, getState) => {
    const data = await axios
        .post(`/api/auth/resend`, user, tokenConfig(getState().Auth.token))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            })
        })
    return data
}
//Check token & Load User
export const googleUser = (token) => async (dispatch, getState) => {
    dispatch({type: USER_LOADING})

    await axios
        .get(`/api/auth/current_user`, tokenConfig(token))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            })
        })
}

//Check token & Load User
export const loadUser = (user) => async (dispatch, getState) => {
    //User Loading
    dispatch({type: USER_LOADING})
    console.log('here')
    await axios
        .post(`/api/auth/login`, user)
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: AUTH_ERROR,
                payload: err.response
            })
        })
}

//Check token & Load User
export const updateVehicle = (token, vehicle) => async (dispatch, getState) => {
    dispatch({type: USER_LOADING});
    await axios
        .post(`/api/vehicle/default`, vehicle, tokenConfig(token))
        .then(res => dispatch({
            type: SET_DEFAULT_VEHICLE,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
                payload: err.response
            })
        })
}

//Check token & Load User
export const decodeVehicle = (token, vehicle) => async (dispatch, getState) => {
    await axios
        .post(`/api/vehicle/decode`, vehicle, tokenConfig(token))
        .then(res => dispatch({
            type: SET_DEFAULT_VEHICLE,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
                payload: err.response.data
            })
        })
}

export const registerUser = (user) => async (dispatch) => {
    //User Loading
    // console.log(user);
    dispatch({type: USER_LOADING})

    await axios
        .post(`/api/auth/register`, user)
        .then(res => dispatch({
            type: REGISTER_USER,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
                payload: {data: 'User with that email already exists'}
            })
        })
}

export const forgotPassword = (user) => async (dispatch, getState) => {
    //User Loading
    // console.log(user);
    dispatch({type: USER_LOADING})

    await axios
        .post(`/api/auth/reset`, user)
        .then(res => dispatch({
            type: FORGET_PASSWORD,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
                payload: err.response
            })
        })
}

export const changePassword = (user, token) => async (dispatch, getState) => {
    //User Loading
    // console.log(user);
    dispatch({type: USER_LOADING})

    await axios
        .post(`/api/auth/password`, user, tokenConfig(token))
        .then(res => dispatch({
            type: FORGET_PASSWORD_SUCCESS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: AUTH_ERROR,
                payload: err.response
            })
        })
}

export const contactEmail = (contact) => async (dispatch, getState) => {
    dispatch({type: USER_LOADING})
    await axios
        .post(`/api/auth/contact`, contact)
        .then(res => dispatch({
            type: SET_TOKEN,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: SET_TOKEN,
                payload: err.response
            })
        })
}

export const mailingList = (data) => async (dispatch, getState) => {
    dispatch({type: USER_LOADING})
    await axios
        .post(`/api/auth/addMailing`, data)
        .then(res => dispatch({
            type: SET_TOKEN,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: SET_TOKEN,
                payload: err.response
            })
        })
}


// //Return errors
// export const returnErrors = (msg, status, id = null) => {
//     return {
//         type: GET_ERRORS,
//         payload: { msg, status, id }
//     };
// };

//Clear Errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    };
};
