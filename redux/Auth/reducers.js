import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGOUT_USER,
    CURRENT_USER,
    SET_TOKEN,
    SIGN_UP_FOR_NEWSLETTER,
    REGISTER_USER,
    FORGET_PASSWORD,
    FORGET_PASSWORD_SUCCESS,
    SET_DEFAULT_VEHICLE,
    LOGGED_OUT,
} from './constants';

const INIT_STATE = {
    token: '',
    isAuthenticated: false,//null,
    user: {},
    loading: false,
    error: {data: ''},
    loggedOut: false,
    notification: '',
    email: ''
};

const Auth = (state = INIT_STATE, action) => {
    switch (action.type) {
        case USER_LOADING:
            return {...INIT_STATE, loading: true };
        case CURRENT_USER:
            return {...state, loading: false, user: {...state.user, paymentMethod: {card: action.payload.card.last4, id: action.payload.id}} };
        case SIGN_UP_FOR_NEWSLETTER:
            return {...state, loading: false, email: action.payload.email };
        case USER_LOADED:
            console.log('///success', action.payload)
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
            console.log('///fail', action.payload)
            return {...state, error: action.payload, loading: false, isAuthenticated: false}
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