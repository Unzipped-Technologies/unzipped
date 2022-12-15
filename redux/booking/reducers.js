import {
    DEL_CART_DATA,
    ADD_CART_DATA,
    USER_SELECTED_LOCATION,
    DEFAULT_LOCATION,
    SELECTED_DATE,
    SELECTED_TIME,
    AVAILABLE_TIMES,
    APP_SCREEN,
    CLEAR_CART,
    PRODUCTS_LOADING,
    PRODUCTS_LOADED,
    PRODUCT_ERROR,
    ORDER_DETAILS,
    SUBMIT_ORDER,
    CONFIRM_ORDER,
    CONFIRM_PROMO,
    ORDER_HISTORY,
    RESET_PROMO,
    SET_TOTAL,
    RESET_TOTAL,
    RESET_ORDER,
    GET_GARAGES,
    LOAD_MORE_GARAGES,
    CUSTOM_LOCATION,
    SET_HOTEL
} from "./constants";

const INIT_STATE = {
    existingItems: [],
    loading: false,
    cart: [],
    location: { name: "Select map area" },
    locations: [],
    date: "Select a Date",
    time: null,
    error: null,
    total: 0,
    credits: 0,
    available: {},
    screen: "all-in",
    count: 0,
    popup: false,
    link: "services",
    quantity: 0,
    orderDetails: {},
    orderStatus: {success: false, message: 'place an order'},
    promo: {error: '', id: '', code: '', description: '', userType: 'any', discount: 1},
    orderHistory: [],
    promoApplied: false,
    moreGarages: true,
    hotel: 'N/A'
}

const Booking = (state = INIT_STATE, action = {}) => {
    switch (action.type) {
        case ADD_CART_DATA:
            let addedItem = state.existingItems.find(item => item.id == action.payload.id);
            let existed_item = state.cart.find(item => item.id === action.payload.id);
            let total = state.total
            if (addedItem.price !== 50) {
              total = total + addedItem.price
            }

            if (existed_item) {
                addedItem.quantity += 1
                return {...state, total: total, credits: total * .85};
            }
            else {
                addedItem.quantity = 1
                let newTotal = state.total
                if (addedItem.price !== 50) {
                  newTotal = newTotal + addedItem.price
                } 
                return {
                    ...state,
                    cart: [
                        ...state.cart, 
                        {
                            description: addedItem.description, 
                            image: addedItem.image, 
                            id: addedItem.id, name: addedItem.name, 
                            price: addedItem.price, 
                            type: addedItem.type,
                            quantity: 1,
                        }
                    ],
                    total: newTotal,
                    count: [...state.cart, addedItem].length,
                    credits: total * .85,
                    }
                }
        case DEL_CART_DATA:
            let itemToRemove = state.cart.find(item => item.id === action.payload.id)
            let new_item = state.cart.filter(item => action.payload.id !== item.id)
            let newTotal = state.total
            if (itemToRemove.price !== 50) {
                if (new_item.length > 0) {
                    newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
                } else {
                    newTotal = 0
                }
            }
            return {
                ...state, 
                cart: new_item,
                total: newTotal,
                credits: newTotal * .85,
                count: new_item.length,
            };
        case USER_SELECTED_LOCATION:
            return {...state, loading: false, location: action.payload};
        case DEFAULT_LOCATION:
            return {...state, loading: false, location: action.payload };
        case SELECTED_DATE:
            return {...state, loading: false, date: action.payload};
        case SELECTED_TIME:
            return {...state, loading: false, time: action.payload};
        case PRODUCTS_LOADING:
            return {...state, loading: true};
        case PRODUCTS_LOADED:
            return {...state, loading: false, existingItems: action.payload};
        case AVAILABLE_TIMES:
            return {...state, loading: false, available: {...action.payload}};
        case APP_SCREEN:
            return {...state, screen: action.payload};
        case ORDER_DETAILS:
            return {...state, loading: false, orderDetails: action.payload};
        case LOAD_MORE_GARAGES:
            let moreGarages = true;
            if (action.payload.length === 0) {
                moreGarages = false
            }
            return {...state, loading: false, moreGarages: moreGarages, orders: [...state.orders, ...action.payload]};
        case SUBMIT_ORDER:
            return {
                ...state, 
                loading: false, 
                orderStatus: { message: action.payload.message, success: action.payload.success },
                orderHistory: action.payload.orderHistory,
            };
        case CLEAR_CART:
            return {...INIT_STATE, date: "Select a Date"}
        case CONFIRM_ORDER:
            return {
                ...state, 
                loading: false, 
                orderStatus: { message: action.payload, success: true },
            };
            case CONFIRM_PROMO:
                return {...state, loading: false, promo: action.payload};
            case ORDER_HISTORY:
                return {...state, loading: false, orderHistory: [...action.payload]};
            case PRODUCT_ERROR:
                return {...state, loading: false, error: action.payload};
            case RESET_PROMO:
                return {...state, promo: {...state.promo, error: ''}};
            case SET_TOTAL:
                return {...state, total: action.payload, promoApplied: true};
            case GET_GARAGES:
                return {...state, locations: action.payload, loading: false};
            case RESET_TOTAL:
                return {...state, promoApplied: false};
            case CUSTOM_LOCATION:
                return {...state, location: action.payload};
            case SET_HOTEL:
                return {...state, hotel: action.payload};
            case RESET_ORDER:
                let orderHistory = state.orderHistory
                return {...INIT_STATE, orderHistory: orderHistory, orderStatus: {success: false, message: 'place an order'}};
        default:
            return state;
    }
}

export default Booking;