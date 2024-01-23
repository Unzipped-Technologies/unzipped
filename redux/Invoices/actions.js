import {
  CREATE_INVOICE,
  GET_INVOICES,
  GET_INVOICE_BY_ID,
  UPDATE_INVOICE,
  DELETE_INVOICE,
  INVOICE_ERROR
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const createInvoice = data => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .post(`/api/invoice`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: CREATE_INVOICE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: INVOICE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getInvoices =
  ({ businessId = '', freelancerId = '', limit = 25, page = 1 }) =>
  async (dispatch, getState) => {
    dispatch(startLoading())

    await axios
      .get(
        `/api/invoice?businessId=${businessId}&freelancerId=${freelancerId}&limit=${limit}&page=${page}`,
        tokenConfig(getState()?.Auth.token)
      )
      .then(res => {
        dispatch({
          type: GET_INVOICES,
          payload: res.data
        })
      })
      .catch(err => {
        dispatch({
          type: INVOICE_ERROR,
          payload: err.response
        })
      })
    dispatch(stopLoading())
  }

export const getInvoiceById = invoiceID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .get(`/api/invoice/${invoiceID}`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_INVOICE_BY_ID,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: INVOICE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateInvoice = (invoiceID, data) => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .put(`/api/invoice/update/${invoiceID}`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: UPDATE_INVOICE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: INVOICE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deleteInvoice = invoiceID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/invoice/${invoiceID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_INVOICE,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: INVOICE_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}
