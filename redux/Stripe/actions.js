import {
    STRIPE_CUSTOMER_AND_SETUP_INTENT,
    CREATE_PAYMENT_METHOD,
    STRIPE_ERROR,
    GET_PAYMENT_METHODS,
    RETRIEVE_BANK_ACCOUNT,
    GET_ONBOARDING_LINK,
    DELETE_PAYMENT_METHODS,
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
                type: STRIPE_CUSTOMER_AND_SETUP_INTENT,
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
                type: CREATE_PAYMENT_METHOD,
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

export const getPaymentMethods = (token) => async (dispatch, getState) => {
    dispatch(startLoading());
    await axios
        .get('/api/user/current/payment-methods', tokenConfig(token))
        .then(res => {
            dispatch({
                type: GET_PAYMENT_METHODS,
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

export const deletePaymentMethods = (id, token) => async (dispatch, getState) => {
    dispatch(startLoading());
    await axios
        .post('/api/contract/payment-methods/delete', id, tokenConfig(token))
        .then(res => {
            dispatch({
                type: DELETE_PAYMENT_METHODS,
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

export const retrieveExternalBankAccounts = (token) => async (dispatch, getState) => {
    dispatch(startLoading());
    await axios
        .post('/api/stripe/retrieve-external-bank-accounts', {}, tokenConfig(token))
        .then(res => {
            dispatch({
                type: RETRIEVE_BANK_ACCOUNT,
                payload: res.data.data
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

export const getAccountOnboardingLink = (token, data) => async (dispatch, getState) => {
    dispatch(startLoading());
    await axios
        .post('/api/stripe/create-account', data, tokenConfig(token))
        .then(res => {
            dispatch({
                type: GET_ONBOARDING_LINK,
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