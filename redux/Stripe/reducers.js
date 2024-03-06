import {
    STRIPE_ERROR,
    CREATE_PAYMENT_METHOD,
    STRIPE_CUSTOMER_AND_SETUP_INTENT,
    GET_PAYMENT_METHODS,
    DELETE_PAYMENT_METHODS,
    RETRIEVE_BANK_ACCOUNT,
    GET_ACCOUNT_BALANCE,
    GET_ONBOARDING_LINK,
    WITHDRAW_FUNDS
} from './constants';

const INIT_STATE = {
    session: {},
    methods: [],
    bank: [],
    url: '',
    balance: {
        available: [
            {
                amount: 0
            }
        ],
        instant_available: [
            {
                amount: 0
            }
        ],
    },
    loading: false,
    error: null,
}

const Messages = (state = INIT_STATE, action) => {
    switch (action.type) {
        case STRIPE_CUSTOMER_AND_SETUP_INTENT:
            return { ...state, loading: false, session: action.payload };
        case GET_PAYMENT_METHODS:
            return { ...state, loading: false, methods: action.payload };
        case RETRIEVE_BANK_ACCOUNT:
            return { ...state, loading: false, bank: action.payload };
        case GET_ONBOARDING_LINK:
            return { ...state, loading: false, url: action.payload };
        case GET_ACCOUNT_BALANCE:
            return { ...state, loading: false, balance: action.payload };
        case WITHDRAW_FUNDS:
            return { ...state, loading: false};
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