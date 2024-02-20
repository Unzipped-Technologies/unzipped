import {
    STRIPE_ERROR,
    CREATE_PAYMENT_METHOD,
    STRIPE_CUSTOMER_AND_SETUP_INTENT,
    GET_PAYMENT_METHODS,
    DELETE_PAYMENT_METHODS,
} from './constants';

const INIT_STATE = {
    session: {},
    methods: [],
    loading: false,
    error: null,
}

const Messages = (state = INIT_STATE, action) => {
    switch (action.type) {
        case STRIPE_CUSTOMER_AND_SETUP_INTENT:
            return { ...state, loading: false, session: action.payload };
        case GET_PAYMENT_METHODS:
            return { ...state, loading: false, methods: action.payload };
        case DELETE_PAYMENT_METHODS:
            console.log(action.payload)
            return { ...state, loading: false };
        case STRIPE_ERROR:
            return { ...state, loading: false, error: action.payload };
        case CREATE_PAYMENT_METHOD:
            return { ...state, loading: false, session: {} };
        default:
            return state;
    }
};

export default Messages;