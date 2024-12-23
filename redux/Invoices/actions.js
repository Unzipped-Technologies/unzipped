import {
  CREATE_INVOICE,
  GET_INVOICES,
  GET_INVOICE_BY_ID,
  UPDATE_INVOICE,
  DELETE_INVOICE,
  INVOICE_ERROR,
  GET_UNPAID_INVOICES
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const createInvoice = data => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .post(`/api/invoice/create`, data, tokenConfig(getState()?.Auth.token))
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
  ({ businessId = '', freelancerId = '', _id = '', limit = 'all', page = 1 }) =>
  async (dispatch, getState) => {
    dispatch(startLoading())
    let params = {
      limit: limit,
      page: page
    }

    // Add parameters based on variable values
    if (_id) {
      params._id = _id
    }
    if (businessId) {
      params.businessId = businessId
    }
    if (freelancerId) {
      params.freelancerId = freelancerId
    }

    // Build the URL with query parameters
    const url = `/api/invoice` + '?' + new URLSearchParams(params)
    await axios
      .get(url, tokenConfig(getState()?.Auth.token))
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

export const getUnpaidInvoices = () => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .get(`/api/invoice/fetch/unpaid`, tokenConfig(getState()?.Auth.token))
    .then(res => {
      dispatch({
        type: GET_UNPAID_INVOICES,
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

export const addInvoiceTasks = (invoiceID, data) => async (dispatch, getState) => {
  dispatch(startLoading())
  await axios
    .put(`/api/invoice/update/${invoiceID}/add-tasks`, data, tokenConfig(getState()?.Auth.token))
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
