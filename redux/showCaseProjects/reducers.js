import {
  CREATE_SHOWCASE_PROJECT,
  GET_SHOWCASE_PROJECTS,
  GET_SHOWCASE_PROJECT_BY_ID,
  UPDATE_SHOWCASE_PROJECT,
  DELETE_SHOWCASE_PROJECT,
  SHOWCASE_PROJECT_ERROR,
  HIDE_SUCCESS_NOTIFICATION,
  LOAD_STATE,
  SUCCESS
} from './constants'

const INIT_STATE = {
  showCaseProjects: [],
  selectedShowCaseProject: {},
  error: '',
  loading: false,
  totalCount: 0,
  success: false
}

const ShowCaseProjects = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case HIDE_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: false
      }
    case CREATE_SHOWCASE_PROJECT:
      return {
        ...state,
        loading: false,
        success: true,
        showCaseProjects: [...state.showCaseProjects]
      }
    case UPDATE_SHOWCASE_PROJECT:
      const RemoveUpdatedProject = state.showCaseProjects.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, showCaseProjects: [action.payload, ...RemoveUpdatedProject] }
    case DELETE_SHOWCASE_PROJECT:
      let newListProjects = state.showCaseProjects.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, showCaseProjects: [...newListProjects] }
    case GET_SHOWCASE_PROJECTS:
      const selectedShowCaseProject = action.payload?.data.find(e => e.isSelected) || action.payload?.data[0]
      return {
        ...state,
        loading: false,
        selectedShowCaseProject,
        showCaseProjects: action.payload.data,
        totalCount: action.payload.totalResults
      }
    case GET_SHOWCASE_PROJECT_BY_ID:
      const project = state.showCaseProjects.map(e => {
        return {
          ...e,
          isSelected: action.payload._id === e._id
        }
      })
      return {
        ...state,
        loading: false,
        selectedShowCaseProject: action.payload
      }
    case SHOWCASE_PROJECT_ERROR:
      return { ...state, loading: false, error: action.payload }
    case SUCCESS:
      return { ...state, loading: true }
    case LOAD_STATE:
      return { ...state, loading: true }
    default:
      return state
  }
}

export default ShowCaseProjects
