import {
    STRIPECUSTOMERANDSETUPINTENT,
    CREATEPAYMENTMETHOD,
    STRIPE_ERROR,
} from './constants';
import _ from 'lodash';
import axios from 'axios';
import { tokenConfig } from '../../services/tokenConfig';
import { startLoading, stopLoading } from '../Loading/actions';

export const createStripeCustomerAndSetupIntent = (data, token) => async (dispatch, getState) => {
    dispatch(startLoading());
    await axios
        .post(`/api/contract/create-stripe-intent`, data, tokenConfig(token))
        .then(res => {
            dispatch({
                type: STRIPECUSTOMERANDSETUPINTENT,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: STRIPE_ERROR,
                payload: err.response
            })
        })
    dispatch(stopLoading());
};

export const createPaymentMethod = (data, token) => async (dispatch, getState) => {
    dispatch(startLoading());
    await axios
        .post(`/api/contract/create-payment-method`, data, tokenConfig(token))
        .then(res => {
            dispatch({
                type: CREATEPAYMENTMETHOD,
                payload: res.data
            });
        })
        .catch(err => {
            dispatch({
                type: STRIPE_ERROR,
                payload: err.response
            })
        })
    dispatch(stopLoading());
};