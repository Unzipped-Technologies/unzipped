import { MEETING_LOADING, UPDATE_MEETING, CREATE_MEETING, MEETING_ERROR } from './constants'

const INIT_STATE = {
  meeting: [],
  loading: false,
  error: null
}

const Meetings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case MEETING_LOADING:
      return { ...state, loading: true }
    case UPDATE_MEETING:
      return { ...state, loading: false }
    case CREATE_MEETING:
      return {
        ...state,
        loading: false,
        error: null
      }
    case MEETING_ERROR:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default Meetings
