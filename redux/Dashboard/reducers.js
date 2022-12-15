import {
    FETCH_CUSTOMERS,
    LOAD_CUSTOMERS,
    FETCH_ORDERS,
    FETCH_SCHEDULE,
    FETCH_GARAGES,
    FETCH_PROMOS,
    ADD_GARAGE,
    DEL_GARAGE,
    UPDATE_GARAGE,
    UPDATE_USER_DATA,
    ADD_PROMO,
    DEL_PROMO,
    UPDATE_PROMO,
    REFUND_ORDER,
    SUBMIT_ORDER,
    ADD_ORDER,
    UPDATE_ORDER,
    UPDATE_ORDER_STATUS,
    UPDATE_ERROR,
    FETCH_PENDING_ORDERS,
    FETCH_MORE_CUSTOMERS,
    FETCH_MORE_PROMOS,
    FETCH_MORE_ORDERS,
    GARAGE_ORDERS,
    HOTEL_ORDERS,
    HOTEL_OWED,
} from './constants';

const INIT_STATE = {
    loading: false,
    orders: [],
    pendingOrders: [],
    garages: [],
    promos: [],
    users: [],
    schedule: [],
    hasMoreOrders: true,
    hasMorePromos: true,
    garageOrders: [],
    hotelOrders: [],
    hotelOwed: [],
    error: ''
}

const Dashboard = (state = INIT_STATE, action = {}) => {
    switch (action.type) {
        case FETCH_CUSTOMERS:
            return {...state, loading: false, users: action.payload};
        case FETCH_MORE_CUSTOMERS:
            return {...state, loading: false, users: [...action.payload, ...state.users]};
        case FETCH_MORE_ORDERS:
            let hasMoreOrders = true;
            if (action.payload.length === 0) {
                hasMoreOrders = false
            }
            return {...state, loading: false, orders: [...state.orders, ...action.payload], hasMoreOrders: hasMoreOrders};
        case FETCH_MORE_PROMOS:
            let hasMorePromos = true;
            if (action.payload.length === 0) {
                hasMorePromos = false
            }
            return {...state, loading: false, promos: [...state.promos, ...action.payload], hasMorePromos: hasMorePromos};
        case LOAD_CUSTOMERS:
            return {...state, loading: true};
        case FETCH_ORDERS:
            return {...state, loading: false, orders: action.payload};
        case FETCH_PENDING_ORDERS:
            return {...state, loading: false, pendingOrders: action.payload};
        case FETCH_SCHEDULE:
            return {...state, loading: false, schedule: action.payload};
        case FETCH_GARAGES:
            return {...state, loading: false, garages: action.payload};
        case FETCH_PROMOS:
            return {...state, loading: false, promos: action.payload};
        case ADD_GARAGE:
            return {...state, loading: false, garages: [...state.garages, action.payload]};
        case DEL_GARAGE:
            return {...state, loading: false, garages: action.payload};
        case UPDATE_GARAGE:
            return {...state, loading: false, garages: action.payload};
        case UPDATE_USER_DATA:
            return {...state, loading: false, users: action.payload};
        case ADD_PROMO:
            return {...state, loading: false, promos: action.payload};
        case DEL_PROMO:
            return {...state, loading: false, promos: action.payload};
        case UPDATE_PROMO:
            return {...state, loading: false, promos: action.payload};
        case REFUND_ORDER:
            return {...state, loading: false, pendingOrders: [...action.payload]};
        case HOTEL_OWED:
            return {...state, loading: false, hotelOwed: [...action.payload]};
        case ADD_ORDER:
            return {...state, loading: false, pendingOrders: [action.payload, ...state.pendingOrders]};
        case UPDATE_ORDER:
            return {...state, loading: false, pendingOrders: action.payload.pending, orders: action.payload.complete};
        case UPDATE_ORDER_STATUS:
            return {...state, loading: false, pendingOrders: action.payload.pending, orders: action.payload.complete};
        case UPDATE_ERROR:
            return {...state, loading: false, error: action.payload};
        case GARAGE_ORDERS:
            return {...state, loading: false, garageOrders: [...action.payload]};
        case HOTEL_ORDERS:
            return {...state, loading: false, hotelOrders: [...action.payload]};
        case SUBMIT_ORDER:
            return {...state, loading: false, orders: action.payload}
        default: 
            return {...state};
}}

export default Dashboard;