import {
  STRIPE_CUSTOMER_AND_SETUP_INTENT,
  CREATE_PAYMENT_METHOD,
  STRIPE_ERROR,
  GET_PAYMENT_METHODS,
  RETRIEVE_BANK_ACCOUNT,
  GET_ONBOARDING_LINK,
  GET_ACCOUNT_BALANCE,
  WITHDRAW_FUNDS,
  DELETE_PAYMENT_METHODS
} from './constants'
import _ from 'lodash'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'

export const createStripeCustomerAndSetupIntent = (data, token) => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post(`/api/contract/create-stripe-intent`, data, tokenConfig(token))
    .then(res => {
      dispatch({
        type: STRIPE_CUSTOMER_AND_SETUP_INTENT,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: STRIPE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const createPaymentMethod = (data, token) => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post(`/api/contract/create-payment-method`, data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: CREATE_PAYMENT_METHOD,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: STRIPE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getPaymentMethods = () => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .get('/api/user/current/payment-methods', tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: GET_PAYMENT_METHODS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: STRIPE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deletePaymentMethods = (id, token) => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post('/api/contract/payment-methods/delete', id, tokenConfig(token))
    .then(res => {
      dispatch({
        type: DELETE_PAYMENT_METHODS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: STRIPE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const retrieveExternalBankAccounts = token => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post('/api/stripe/retrieve-external-bank-accounts', {}, tokenConfig(token))
    .then(res => {
      dispatch({
        type: RETRIEVE_BANK_ACCOUNT,
        payload: res.data.data
      })
    })
    .catch(err => {
      dispatch({
        type: STRIPE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getAccountOnboardingLink = data => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post('/api/stripe/create-account', data, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: GET_ONBOARDING_LINK,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: STRIPE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getAccountBalance = () => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post('/api/stripe/retrieve-account-balance', {}, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: GET_ACCOUNT_BALANCE,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: STRIPE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const verifyUserStripeAccount = userId => async (dispatch, getState) => {
  dispatch(startLoading())
  const response = await axios
    .get(`/api/stripe/verify-account/${userId}`, tokenConfig(getState()?.Auth.token))
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
  dispatch(stopLoading())
  return response
}

export const withdrawAccountFundsToExternalBank = (token, data) => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .post('/api/stripe/withdraw-funds', data, tokenConfig(token))
    .then(res => {
      dispatch({
        type: WITHDRAW_FUNDS,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch({
        type: STRIPE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}
