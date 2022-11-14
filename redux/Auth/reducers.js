import { removeCookie } from './actions';
import {
    LOGIN_USER,
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    CURRENT_USER,
    SET_TOKEN,
    // REGISTER_USER,
    REGISTER_USER,
    REGISTER_USER_FAILED,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    SET_DEFAULT_VEHICLE,
    LOGGED_OUT,
    // FORGET_PASSWORD_FAILED,
    // CLEAR_ERRORS,
    // SET_COOKIE
} from './constants';

const INIT_STATE = {
    token: '',
    isAuthenticated: false,//null,
    user: {},
    loading: false,
    error: {data: ''},
    loggedOut: false,
    notification: '',
};

const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {...INIT_STATE, loading: true };
        case CURRENT_USER:
            return {...state, loading: false, user: {...state.user, paymentMethod: {card: action.payload.card.last4, id: action.payload.id}} };
        case USER_LOADED:
            let authenticate = true
            if (action.payload.error) {
                authenticate = false
            }
            return {...state, isAuthenticated: true, loading: false, user: action.payload, token: action.payload.cookie, error: {data: ''}}
        case LOGIN_USER_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: {data: ''} };
        case REGISTER_USER:
            let isAuthenticated = true
            if(action.payload.error) {
                isAuthenticated = false
            }
            return {...state, isAuthenticated: isAuthenticated, loading: false, user: action.payload, token: action.payload.cookie};
        case LOGOUT_USER:
            return {...INIT_STATE, loggedOut: true, loading: false}
        case AUTH_ERROR:
            return {...state, error: action.payload, loading: false}
        case SET_DEFAULT_VEHICLE:
            return {...state, user: action.payload, loading: false, error: {data: ''}}
        case FORGET_PASSWORD:
            return {...state, token: action.payload, loading: false}
        case SET_TOKEN:
            return {...state, notification: action.payload, loading: false}
        case LOGGED_OUT:
            return {...state, loggedOut: false}
        case FORGET_PASSWORD_SUCCESS:
            return {...state, isAuthenticated: true, loading: false, user: action.payload, token: action.payload.cookie, error: ''}
        case LOGIN_USER_FAILED:
        default:
            return state;
    }
};


export default Auth;