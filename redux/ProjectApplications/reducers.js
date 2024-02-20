import {
  CREATE_PROJECT_APPLICATION,
  GET_PROJECT_APPLICATIONS,
  GET_PROJECT_APPLICATION_BY_ID,
  UPDATE_PROJECT_APPLICATION,
  DELETE_PROJECT_APPLICATION,
  PROJECT_APPLICATION_ERROR,
  SHOW_SUCCESS_NOTIFICATION,
  HIDE_SUCCESS_NOTIFICATION,
  LOAD_STATE,
  SUCCESS
} from './constants'

const INIT_STATE = {
  projectApplications: [],
  selectedApplication: {},
  error: '',
  loading: false,
  totalCount: 0,
  success: false
}

const ProjectApplications = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case HIDE_SUCCESS_NOTIFICATION:
      return {
        ...state,
        success: false
      }
    case CREATE_PROJECT_APPLICATION:
      return {
        ...state,
        loading: false,
        success: true,
        projectApplications: [...state.projectApplications]
      }
    case UPDATE_PROJECT_APPLICATION:
      const RemoveUpdateApplication = state.projectApplications.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, projectApplications: [action.payload, ...RemoveUpdateApplication] }
    case DELETE_PROJECT_APPLICATION:
      let newListApplication = state.projectApplications.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, projectApplications: [...newListApplication] }
    case GET_PROJECT_APPLICATIONS:
      const selectedApplication = action.payload?.data.find(e => e.isSelected) || action.payload?.data[0]
      return {
        ...state,
        loading: false,
        selectedApplication,
        projectApplications: action.payload.data,
        totalCount: action.payload.totalResults
      }
    case GET_PROJECT_APPLICATION_BY_ID:
      const application = state.projectApplications.map(e => {
        return {
          ...e,
          isSelected: action.payload._id === e._id
        }
      })
      return {
        ...state,
        loading: false,
        selectedApplication: action.payload
      }
    case PROJECT_APPLICATION_ERROR:
      return { ...state, loading: false, error: action.payload }
    case SUCCESS:
      return { ...state, loading: true }
    case LOAD_STATE:
      return { ...state, loading: true }
    default:
      return state
  }
}

export default ProjectApplications
