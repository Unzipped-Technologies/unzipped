import {
  CREATE_CONTRACT,
  GET_CONTRACTS,
  GET_CONTRACT_BY_ID,
  UPDATE_CONTRACT,
  DELETE_CONTRACT,
  GET_ACTIVE_CONTRACTS,
  LOAD_STATE,
  SUCCESS,
  CONTRACT_ERROR,
  UPDATE_CONTRACT_FORM,
  RESET_CONTRACT_FORM,
  REVOKE_ACCESS_SUCCESS,
  REVOKE_ACCESS_ERROR
} from './constants'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'
import { startLoading, stopLoading } from '../Loading/actions'
import { ConverterUtils } from '../../utils'

export const updateContractForm = data => async dispatch => {
  dispatch({
    type: UPDATE_CONTRACT_FORM,
    payload: data
  })
}

export const resetContractForm = () => async dispatch => {
  dispatch({
    type: RESET_CONTRACT_FORM,
    payload: null
  })
}

export const createContract = data => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .post(`/api/contract/create`, data, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: CREATE_CONTRACT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: CONTRACT_ERROR,
        payload: err.response?.data?.msg ?? 'Something went wrong!'
      })
    })
  dispatch(stopLoading())
}

export const getContracts =
  ({ businessId, freelancerId = '', limit = 25, page = 1 }) =>
  async (dispatch, getState) => {
    dispatch(startLoading())

    await axios
      .get(
        `/api/contract?businessId=${businessId}&freelancerId=${freelancerId}&limit=${limit}&page=${page}`,
        tokenConfig(getState()?.Auth.token)
      )
      .then(res => {
        dispatch({
          type: GET_CONTRACTS,
          payload: res.data
        })
        dispatch({
          type: REVOKE_ACCESS_SUCCESS,
          payload: false
        })
      })
      .catch(err => {
        dispatch({
          type: CONTRACT_ERROR,
          payload: err.response
        })
      })
    dispatch(stopLoading())
  }

export const getContractById = contractID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .get(`/api/contract/${contractID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_CONTRACT_BY_ID,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: CONTRACT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const getActiveContractsForUser = () => async (dispatch, getState) => {
  dispatch(startLoading())
  console.log('fetching...')
  await axios
    .get(`/api/contract/current?limit=all&isActive=true`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: GET_ACTIVE_CONTRACTS,
        payload: res.data.data
      })
    )
    .catch(err => {
      dispatch({
        type: CONTRACT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const updateContract = (contractID, data) => async (dispatch, getState) => {
  dispatch(startLoading())

  const formData = ConverterUtils.toFormData(data)

  await axios
    .patch(`/api/contract/${contractID}`, formData, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: UPDATE_CONTRACT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: CONTRACT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const deleteContract = contractID => async (dispatch, getState) => {
  dispatch(startLoading())

  await axios
    .patch(`/api/contract/${contractID}`, tokenConfig(getState()?.Auth.token))
    .then(res =>
      dispatch({
        type: DELETE_CONTRACT,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch({
        type: CONTRACT_ERROR,
        payload: err.response
      })
    })
  dispatch(stopLoading())
}

export const countClientContracts = clientId => async (dispatch, getState) => {
  dispatch(startLoading())

  const response = await axios
    .get(`/api/contract/count/${clientId}`, tokenConfig(getState()?.Auth.token))
    .then(res => {
      return res
    })
    .catch(err => {
      return err
    })
  dispatch(stopLoading())
  return response
}


export const revokeAccess = (contractId) => async (dispatch, getState) => {
  dispatch(startLoading())

  try {
    const response = await axios
      .get(`/api/contract/revoke-access/${contractId}`, tokenConfig(getState()?.Auth.token));
    if (response.status === 200) {
      dispatch({ type: REVOKE_ACCESS_SUCCESS, payload: true })
    }
  } catch (error) {
    dispatch({ type: REVOKE_ACCESS_ERROR, payload: false })

  }
  dispatch(stopLoading())

}
