import {
    FETCH_CUSTOMERS,
    LOAD_CUSTOMERS,
    FETCH_NEWS,
    LOAD_NEWS,
    // FETCH_ORDERS,
    // FETCH_GARAGES,
    // FETCH_PROMOS,
    // DEL_GARAGE,
    UPDATE_USER_DATA,
    // DEL_PROMO,
    // REFUND_ORDER,
    // HOTEL_OWED,
    UPDATE_ERROR,
    FETCH_MORE_CUSTOMERS,
    // FETCH_MORE_ORDERS,
    // FETCH_MORE_PROMOS,
    // GARAGE_ORDERS,
    // SUBMIT_ORDER,
    // HOTEL_ORDERS,
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

// export const getOrders = (number, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .get(`/api/dashboard/orders/${number}`, tokenConfig(token))
//         .then(res => dispatch({
//             type: FETCH_ORDERS,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const getPromos = (number, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .get(`/api/dashboard/promos/${number}`, tokenConfig(token))
//         .then(res => dispatch({
//             type: FETCH_PROMOS,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const getGarages = (number, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .get(`/api/dashboard/garage/${number}`, tokenConfig(token))
//         .then(res => dispatch({
//             type: FETCH_GARAGES,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

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

// export const refundAnOrder = (orders, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .post(`/api/dashboard/order/refund`, orders, tokenConfig(token))
//         .then(res => dispatch({
//             type: REFUND_ORDER,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

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

// export const addGarage = (garage, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .post(`/api/dashboard/garage/add`, garage, tokenConfig(token))
//         .then(res => dispatch({
//             type: FETCH_GARAGES,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const addPromos = (promo, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .post(`/api/dashboard/promos/add`, promo, tokenConfig(token))
//         .then(res => dispatch({
//             type: FETCH_PROMOS,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const delPromos = (promo, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .post(`/api/dashboard/promos/delete`, promo, tokenConfig(token))
//         .then(res => dispatch({
//             type: DEL_PROMO,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const delGarages = (garage, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .post(`/api/dashboard/garage/delete`, garage, tokenConfig(token))
//         .then(res => dispatch({
//             type: DEL_GARAGE,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

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

// export const getMoreOrders = (number, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .get(`/api/dashboard/orders/${number}`, tokenConfig(token))
//         .then(res => dispatch({
//             type: FETCH_MORE_ORDERS,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const getMorePromos = (number, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})

//     await axios
//         .get(`/api/dashboard/promos/${number}`, tokenConfig(token))
//         .then(res => dispatch({
//             type: FETCH_MORE_PROMOS,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }


// export const createOrder = (orderDetails, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})
//     const order = {
//         location: {name: getState().Auth.user.hotel, address: getState().Auth.user.hotel, location: {lat: 0, lng: 0}},
//         time: "Overnight",
//         date: orderDetails.date,
//         cart: [{name: "Exterior & Interior Detail Package", image: ["Vohnt-Wash.png"], price: 150, quantity: 1}],
//         total: 150,
//         email: orderDetails.email,
//         order: orderDetails.orderNumber,
//         vehicle: orderDetails.vehicle,
//         hotel: getState().Auth.user.hotel,
//         valetNumber: orderDetails.valetNumber,
//         roomNumber: orderDetails.roomNumber,
//         transmission: orderDetails.transmission
//     }
//     // console.log(order)
//     // console.log(token)
//     await axios
//         .post(`/api/dashboard/orders/create`, order, tokenConfig(token))
//         .then(res => {
//             // console.log(res);
//             dispatch({
//             type: SUBMIT_ORDER,
//             payload: res.data,
//             })
//         }
//         )
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const getGarageOrders = (month, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})
//     await axios
//         .post(`/api/dashboard/garageOrders`, {month}, tokenConfig(token))
//         .then(res => dispatch({
//             type: GARAGE_ORDERS,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const getHotelOrders = (month, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})
//     await axios
//         .post(`/api/dashboard/hotelOrders`, {month}, tokenConfig(token))
//         .then(res => dispatch({
//             type: HOTEL_ORDERS,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }

// export const getHotelOwed = (month, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})
//     await axios
//         .post(`/api/dashboard/hotelOwed`, {month}, tokenConfig(token))
//         .then(res => dispatch({
//             type: HOTEL_OWED,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }



// export const updateStatus = (status, order, token) => async (dispatch, getState) => {
//     //products Loading
//     dispatch({type: LOAD_CUSTOMERS})
//     await axios
//         .post(`/api/dashboard/status`, {status, order}, tokenConfig(token))
//         .then(res => dispatch({
//             type: FETCH_ORDERS,
//             payload: res.data,
//         }))
//         .catch(err => {
//             // dispatch(returnErrors(err.response, err.response))
//             dispatch({
//                 type: UPDATE_ERROR,
//                 payload: err.response
//             })
//         })
// }