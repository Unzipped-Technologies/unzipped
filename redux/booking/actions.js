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
    PRODUCT_ERROR,
    PRODUCTS_LOADING,
    PRODUCTS_LOADED,
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
} from './constants';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';
import keys from '../../config/keys';

export const addCart = (name, price, id) => ({
    type: ADD_CART_DATA,
    payload: {name: name, price: price, id: id}
});

export const delCart = (id, qty) => ({
    type: DEL_CART_DATA,
    payload: {id: id, qty: qty}
});

export const selectLocation = (payload) => ({
    type: USER_SELECTED_LOCATION,
    payload
});

export const orderDetail = (payload) => ({
    type: ORDER_DETAILS,
    payload
});

export const clearCart = () => ({
    type: CLEAR_CART,
});

export const getDefaultLocation = (payload) => ({
    type: ADD_CART_DATA,
    payload
});

export const updateCart = (payload) => ({
    type: DEFAULT_LOCATION,
    payload
});

export const selectDate = (payload) => ({
    type: SELECTED_DATE,
    payload
});

export const selectHotel = (payload) => ({
    type: SET_HOTEL,
    payload
});

export const selectTimes = (payload) => ({
    type: SELECTED_TIME,
    payload
});

export const resetOrder = () => ({
    type: RESET_ORDER
});

export const loadProducts = () => async (dispatch, getState) => {
    //products Loading
    dispatch({type: PRODUCTS_LOADING})

    await axios
        .get(`/api/product/retreive`)
        .then(res => dispatch({
            type: PRODUCTS_LOADED,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const submitOrder = (token, orderNum, roomNumber, valetNumber, manual) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: PRODUCTS_LOADING})
    const order = {
        location: getState().Booking.location,
        time: getState().Booking.time,
        date: getState().Booking.date,
        cart: getState().Booking.cart,
        total: getState().Booking.total,
        orderDetails: getState().Booking.orderDetails,
        email: getState().Auth.user.email,
        hotel: getState().Auth.user.hotel,
        order: orderNum,
        promo: getState().Booking.promo,
        hotel: getState().Booking.hotel,
        roomNumber: roomNumber,
        valetNumber: valetNumber,
        transmission: manual
    }
    // console.log(order)
    // console.log(token)
    await axios
        .post(`/api/payment/stripe`, order, tokenConfig(token))
        .then(res => {
            // console.log(res);
            dispatch({
            type: SUBMIT_ORDER,
            payload: res.data,
            })
        }
        )
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const dashboardSubmitOrder = (orderDetails, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: PRODUCTS_LOADING})
    const order = {
        location: getState().Booking.location,
        time: getState().Booking.time,
        date: getState().Booking.date,
        cart: getState().Booking.cart,
        total: getState().Booking.total,
        orderDetails: getState().Booking.orderDetails,
        email: selectedUser.email,
        hotel: getState().Auth.user.hotel,
        order: orderDetails.orderNumber,
        promo: getState().Booking.promo,
        hotel: getState().Booking.hotel,
        roomNumber: '',
        valetNumber: '',
        transmission: orderDetails.transmission,
    }
    // console.log(order)
    // console.log(token)
    await axios
        .post(`/api/payment/stripe`, order, tokenConfig(token))
        .then(res => {
            // console.log(res);
            dispatch({
            type: SUBMIT_ORDER,
            payload: res.data,
            })
        }
        )
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const orderConfirmEmail = (token, orderNum) => async (dispatch, getState) => {
    //products Loading
    const order = {
        order: orderNum,
        location: getState().Booking.location,
        time: getState().Booking.time,
        date: getState().Booking.date,
        cart: getState().Booking.cart,
        total: getState().Booking.total,
        promo: getState().Booking.promo,
    }
    await axios
        .post(`/api/payment/receipt`, order, tokenConfig(token))
        .then(res => {
            dispatch({
            type: CONFIRM_ORDER,
            payload: res.data,
            })
        }
        )
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const getMapGarages = (number) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: PRODUCTS_LOADING})

    await axios
        .get(`/api/dashboard/map/${number}`)
        .then(res => dispatch({
            type: GET_GARAGES,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const getMoreGarages = (number) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: PRODUCTS_LOADING})
    await axios
        .get(`/api/dashboard/map/${number}`)
        .then(res => 
            dispatch({
            type: LOAD_MORE_GARAGES,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const setCustomLocation = (location) => async (dispatch) => {
    dispatch({
        type: CUSTOM_LOCATION,
        payload: location
    })
}


export const getPromo = (token, promo) => async (dispatch, getState) => {
    await axios
        .post(`/api/payment/getPromo`, promo, tokenConfig(token))
        .then(res => {
            dispatch({
            type: CONFIRM_PROMO,
            payload: res.data,
            })
        }
        )
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response
            })
        })
}

export const resetPromo = () => (dispatch) => {
    dispatch({
        type: RESET_PROMO
    })
}

export const setTotal = (total) => (dispatch) => {
    dispatch({
        type: SET_TOTAL,
        payload: total
    })
}

export const resetTotal = () => (dispatch) => {
    dispatch({
        type: RESET_TOTAL,
    })
}

export const fetchOrders = (token) => async (dispatch, getState) => {
    dispatch({type: PRODUCTS_LOADING})
    // console.log('action one')
    await axios
        .get(`/api/product/getOrders`, tokenConfig(token))
        .then(res => {
            dispatch({
            type: ORDER_HISTORY,
            payload: res.data,
            })
        }
        )
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: PRODUCT_ERROR,
                payload: err.response
            })
        })
        // console.log('completed')
}

export const getAvailableTimes = (payload) => ({
    type: AVAILABLE_TIMES,
    payload
});

export const startAppScreen = () => ({
    type: APP_SCREEN,
    payload: 'all-in-one'
})

export const stopAppScreen = () => ({
    type: APP_SCREEN,
    payload: 'all-in'
})



