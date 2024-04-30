import { startLoading, stopLoading } from '../Loading/actions'
import {
  GET_LIST_ENTRIES,
  GET_LIST_ENTRIES_BY_ID,
  GET_LIST_ENTRIES_ERROR,
  GET_LIST_ENTRIES_SUCCESS,
  GET_USERS_LIST_BY_USER_ID,
  GET_USERS_LIST_BY_USER_ID_ERROR,
  GET_USERS_LIST_BY_USER_ID_SUCCESS,
  GET_USERS_LIST_SUCCESSS,
  GET_LIST_ENTRIES_BY_ID_SUCCESS,
  GET_TEAM_MEMBER_LIST,
  GET_TEAM_MEMBER_LIST_SUCCESS,
  GET_TEAM_MEMBER_LIST_ERROR,
  CREATE_RECENTLY_VIEWED_LIST,
  CREATE_RECENTLY_VIEWED_LIST_SUCCESS,
  CREATE_RECENTLY_VIEWED_LIST_ERROR,
  GET_RECENTLY_VIEWED_LIST,
  GET_RECENTLY_VIEWED_LIST_SUCCESS,
  GET_RECENTLY_VIEWED_LIST_ERROR,
  GET_USER_LIST_ENTRIES,
  GET_USER_LIST_ENTRIES_ERROR,
  ON_UPDATE_LIST
} from './constant'
import axios from 'axios'
import { tokenConfig } from '../../services/tokenConfig'

const getAllListEntries = (id, queryParams) => async dispatch => {
  dispatch({
    type: GET_LIST_ENTRIES
  })

  try {
    const { key } = queryParams
    let filters = {}
    if (key === 'Favorites') {
      filters.key = key
    }
    if (key === 'Recently Viewed') {
      filters.key = key
    }
    if (key === 'My Team') {
      filters.key = key
    }

    const response = await axios.get(`/api/list-entries/${id}` + (filters?.key ? `?key=${key}` : ''))

    dispatch({
      type: GET_LIST_ENTRIES_SUCCESS,
      payload: response.data
    })
  } catch (err) {
    dispatch({
      type: GET_LIST_ENTRIES_ERROR,
      payload: err.response
    })
  }
  // dispatch(stopLoading());
}

const getUserLists = userId => async dispatch => {
  dispatch(startLoading())
  dispatch({ type: GET_USERS_LIST_BY_USER_ID })
  try {
    const response = await axios.get(`/api/list-entries/users-list/${userId}`)
    dispatch({
      type: GET_USERS_LIST_BY_USER_ID_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_USERS_LIST_BY_USER_ID_ERROR,
      payload: error.response
    })
  }
  dispatch(stopLoading())
}

const getListEntriesById = listId => async dispatch => {
  dispatch(startLoading())

  dispatch({ type: GET_LIST_ENTRIES_BY_ID })
  try {
    const response = await axios.get(`/api/list-entries/find-by-id/${listId}`)
    dispatch({
      type: GET_LIST_ENTRIES_BY_ID_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_USERS_LIST_BY_USER_ID_ERROR,
      payload: error.response
    })
  }
  dispatch(stopLoading())
}

const getTeamMembers = userId => async dispatch => {
  dispatch(startLoading())

  dispatch({ type: GET_TEAM_MEMBER_LIST })
  try {
    const response = await axios.get(`/api/list-entries/team-member/${userId}`)
    dispatch({
      type: GET_TEAM_MEMBER_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_TEAM_MEMBER_LIST_ERROR,
      payload: error.response
    })
  }
  dispatch(stopLoading())
}

const createRecentlyViewdList = params => async dispatch => {
  dispatch(startLoading())
  dispatch({ type: CREATE_RECENTLY_VIEWED_LIST })
  try {
    const response = await axios.post(`/api/list-entries/recently-viewed/`, params)
    dispatch({
      type: CREATE_RECENTLY_VIEWED_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: CREATE_RECENTLY_VIEWED_LIST_ERROR,
      payload: error.response
    })
  }
  dispatch(stopLoading())
}

const getRecentlyViewedList = listId => async dispatch => {
  dispatch(startLoading())

  dispatch({ type: GET_RECENTLY_VIEWED_LIST })
  try {
    const response = await axios.get(`/api/list-entries/find-by-id/${listId}`)
    dispatch({
      type: GET_RECENTLY_VIEWED_LIST_SUCCESS,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_RECENTLY_VIEWED_LIST_ERROR,
      payload: error.response
    })
  }
  dispatch(stopLoading())
}

const getUserListEntries = params => async (dispatch, getState) => {
  dispatch(startLoading())
  try {
    const response = await axios.post(
      `/api/list-entries/users-list-entries`,
      params,
      tokenConfig(getState()?.Auth.token)
    )
    dispatch({
      type: GET_USER_LIST_ENTRIES,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_USER_LIST_ENTRIES_ERROR,
      payload: error.response
    })
  }
  dispatch(stopLoading())
}

export {
  getAllListEntries,
  getUserLists,
  getListEntriesById,
  getTeamMembers,
  createRecentlyViewdList,
  getRecentlyViewedList,
  getUserListEntries
}
