import {
    STRIPE_ERROR,
    CREATEPAYMENTMETHOD,
    STRIPECUSTOMERANDSETUPINTENT
} from './constants';

const INIT_STATE = {
    session: {},
    loading: false,
    error: null,
}

const Messages = (state = INIT_STATE, action) => {
    switch (action.type) {
        case STRIPECUSTOMERANDSETUPINTENT:
            return { ...state, loading: false, session: action.payload };
        case STRIPE_ERROR:
            return { ...state, loading: false, error: action.payload };
        case CREATEPAYMENTMETHOD:
            return { ...state, loading: false, session: {} };
        default:
            return state;
    }
};

export default Messages;