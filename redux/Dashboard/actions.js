import {
    FETCH_CUSTOMERS,
    LOAD_CUSTOMERS,
    FETCH_NEWS,
    LOAD_NEWS,
    FETCH_ORDERS,
    FETCH_PROMOS,
    UPDATE_USER_DATA,
    DEL_PROMO,
    REFUND_ORDER,
    UPDATE_ERROR,
    FETCH_MORE_CUSTOMERS,
    FETCH_MORE_ORDERS,
    FETCH_MORE_PROMOS,
    SUBMIT_ORDER,
} from './constants';
import axios from 'axios';
import {tokenConfig} from '../../services/tokenConfig';

// get the news
export const getNews = (number, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_NEWS})

    await axios
        .get(`/api/user/newsletter/list`)
        .then(res => dispatch({
            type: FETCH_NEWS,
            payload: res.data,
        }))
        .catch(err => {
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const getCustomers = (number, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .get(`/api/dashboard/users/${number}`, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_CUSTOMERS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const getOrders = (number, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .get(`/api/dashboard/orders/${number}`, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_ORDERS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const getPromos = (number, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .get(`/api/dashboard/promos/${number}`, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_PROMOS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const editCustomer = (user, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .post(`/api/dashboard/user/edit`, user, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_CUSTOMERS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const refundAnOrder = (orders, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .post(`/api/dashboard/order/refund`, orders, tokenConfig(token))
        .then(res => dispatch({
            type: REFUND_ORDER,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const addCustomer = (user, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .post(`/api/dashboard/user/add`, user, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_CUSTOMERS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const addPromos = (promo, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .post(`/api/dashboard/promos/add`, promo, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_PROMOS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const delPromos = (promo, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .post(`/api/dashboard/promos/delete`, promo, tokenConfig(token))
        .then(res => dispatch({
            type: DEL_PROMO,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const delCustomer = (customer, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .post(`/api/dashboard/user/delete`, customer, tokenConfig(token))
        .then(res => dispatch({
            type: UPDATE_USER_DATA,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const loadMoreCustomers = (number, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .get(`/api/dashboard/users/${number}`, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_MORE_CUSTOMERS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const getMoreOrders = (number, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .get(`/api/dashboard/orders/${number}`, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_MORE_ORDERS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const getMorePromos = (number, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})

    await axios
        .get(`/api/dashboard/promos/${number}`, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_MORE_PROMOS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}


export const createOrder = (orderDetails, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})
    const order = {
        time: "Overnight",
        date: orderDetails.date,
        total: 150,
        email: orderDetails.email,
        order: orderDetails.orderNumber,
        transmission: orderDetails.transmission
    }
    // console.log(order)
    // console.log(token)
    await axios
        .post(`/api/dashboard/orders/create`, order, tokenConfig(token))
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
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}

export const updateStatus = (status, order, token) => async (dispatch, getState) => {
    //products Loading
    dispatch({type: LOAD_CUSTOMERS})
    await axios
        .post(`/api/dashboard/status`, {status, order}, tokenConfig(token))
        .then(res => dispatch({
            type: FETCH_ORDERS,
            payload: res.data,
        }))
        .catch(err => {
            // dispatch(returnErrors(err.response, err.response))
            dispatch({
                type: UPDATE_ERROR,
                payload: err.response
            })
        })
}