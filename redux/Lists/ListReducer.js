import {
  CREATE_USER_LIST,
  CREATE_USER_LIST_ERROR,
  CREATE_USER_LIST_SUCCESS,
  EDIT_USER_LIST,
  EDIT_USER_LIST_ERROR,
  EDIT_USER_LIST_SUCCESS,
  ON_UPDATE_LIST,
  GET_INVITES_LIST,
  GET_INVITES_LIST_ERROR,
  ADD_ENTRIES_TO_LIST,
  ADD_ENTRIES_TO_LIST_ERROR,
  GET_CURRENT_USER_LIST,
  ON_SELECTED_LIST,
  GET_CURRENT_USER_LIST_ERROR
} from './constant'

const INIT_STATE = {
  loading: false,
  list: null,
  error: null,
  updatedList: null,
  invitesList: [],
  inviteListError: null,
  selectedList: null,
  currentUserList: []
}

const Lists = (state = INIT_STATE, action) => {
  switch (action.type) {
    // Create New Lists
    case CREATE_USER_LIST: {
      return { ...state, loading: true }
    }

    case CREATE_USER_LIST_SUCCESS: {
      return { ...state, loading: false, list: { ...action?.payload } }
    }

    case CREATE_USER_LIST_ERROR: {
      return { ...state, loading: false, error: action.payload }
    }

    // Edit  Lists
    case EDIT_USER_LIST: {
      return { ...state, loading: true }
    }

    case EDIT_USER_LIST_SUCCESS: {
      return { ...state, loading: false, list: { ...action?.payload } }
    }

    case EDIT_USER_LIST_ERROR: {
      return { ...state, loading: false, error: action.payload }
    }

    case ON_UPDATE_LIST: {
      return { ...state, updatedList: { ...action?.payload } }
    }
    case ON_SELECTED_LIST: {
      return { ...state, selectedList: { ...action?.payload } }
    }
    case GET_INVITES_LIST: {
      return { ...state, invitesList: [...action?.payload] }
    }
    case GET_INVITES_LIST_ERROR: {
      return { ...state, loading: false, inviteListError: action.payload }
    }
    case ADD_ENTRIES_TO_LIST: {
      return { ...state, loading: false }
    }
    case ADD_ENTRIES_TO_LIST_ERROR: {
      return { ...state, loading: false, inviteListError: action.payload }
    }

    case GET_CURRENT_USER_LIST: {
      return { ...state, currentUserList: [...action?.payload] }
    }

    case GET_CURRENT_USER_LIST_ERROR: {
      return { ...state, currentUserList: [] }
    }
    default:
      return state
  }
}

export default Lists
