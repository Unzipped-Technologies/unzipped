import {
    FETCH_CUSTOMERS,
    LOAD_CUSTOMERS,
    FETCH_ORDERS,
    FETCH_SCHEDULE,
    FETCH_PROMOS,
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
    GET_STORIES_LIST,
    GET_TAGS_LIST,
    SORT_STORIES_ON_DRAG,
    LOAD_NEWS,
    FETCH_NEWS,
} from './constants';

const INIT_STATE = {
    loading: false,
    orders: [],
    pendingOrders: [],
    promos: [],
    users: [],
    schedule: [],
    hasMoreOrders: true,
    hasMorePromos: true,
    tags: [
        {
            name: 'To Do',
            order: 0,
        },
        {
            name: 'In Progress',
            order: 1,
        },
        {
            name: 'Done',
            order: 2,
        },
        
        
    ],
    stories: [
        {
            tag: 'To Do',
            name: 'Build Home Page',
            points: 3,
            order: 1,
            assignee: {
                name: 'Jason Maynard',
                profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
            }
        },
        {
            tag: 'To Do',
            name: 'Build Update Icons',
            points: 2,
            order: 2,
            assignee: {
                name: 'Jason Maynard',
                profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
            }
        },
        {
            tag: 'In Progress',
            name: 'Build Update Icons',
            points: 3,
            order: 1,
            assignee: {
                name: 'Jason Maynard',
                profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
            }
        },
        {
            tag: 'Done',
            name: 'Build notification component',
            points: 5,
            order: 1,
            assignee: {
                name: 'Jason Maynard',
                profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
            }
        },
        {
            tag: 'Done',
            name: 'Build notification component with a really long story name',
            points: 5,
            order: 2,
            assignee: {
                name: 'Jason Maynard',
                profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1670086178/dinosaur_xzmzq3.png'
            }
        },
    ],
    news: [],
    error: ''
}

const Dashboard = (state = INIT_STATE, action = {}) => {
    switch (action.type) {
        case FETCH_CUSTOMERS:
            return {...state, loading: false, users: action.payload};
        case FETCH_MORE_CUSTOMERS:
            return {...state, loading: false, users: [...action.payload, ...state.users]};
        case LOAD_NEWS:
            return {...state, loading: true, news: []};
        case FETCH_NEWS:
            return {...state, loading: false, news: action.payload};
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
        case FETCH_PROMOS:
            return {...state, loading: false, promos: action.payload};
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
        case ADD_ORDER:
            return {...state, loading: false, pendingOrders: [action.payload, ...state.pendingOrders]};
        case UPDATE_ORDER:
            return {...state, loading: false, pendingOrders: action.payload.pending, orders: action.payload.complete};
        case UPDATE_ORDER_STATUS:
            return {...state, loading: false, pendingOrders: action.payload.pending, orders: action.payload.complete};
        case UPDATE_ERROR:
            return {...state, loading: false, error: action.payload};
        case SUBMIT_ORDER:
            return {...state, loading: false, orders: action.payload}
        default: 
            return {...state};
}}

export default Dashboard;