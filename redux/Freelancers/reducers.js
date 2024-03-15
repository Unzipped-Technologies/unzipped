import {
  FREELANCER_LOADING,
  GET_ALL_FREELANCERS,
  GET_FREELANCER_BY_ID,
  RESET_SELECTED_FREELANCER,
  FREELANCER_ERROR,
  CREATE_USER_INVITATION_SUCCESS,
  SETNAVBAR
} from './constants'

const INIT_STATE = {
  freelancers: [],
  loading: false,
  selectedFreelancer: null,
  error: null,
  totalCount: '',
  isExpanded: false
}

const Freelancers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SETNAVBAR: {
      return { ...state, isExpanded: action.payload }
    }
    case FREELANCER_LOADING:
      return { ...state, loading: true }
    case GET_ALL_FREELANCERS:
      return {
        ...state,
        loading: false,
        freelancers: [...action?.payload],
        totalCount: action?.payload?.totalCount
      }
    case GET_FREELANCER_BY_ID:
      return { ...state, loading: false, selectedFreelancer: action.payload }
    case RESET_SELECTED_FREELANCER:
      return { ...state, loading: true, selectedFreelancer: null }
    case FREELANCER_ERROR:
      return { ...state, loading: false, error: action.payload }

    case CREATE_USER_INVITATION_SUCCESS: {
      return { ...state, loading: false, createdInvitation: action.payload }
    }
    default:
      return state
  }
}

export default Freelancers
