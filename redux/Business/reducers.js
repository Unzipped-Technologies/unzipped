import {
  CREATE_BUSINESS,
  UPDATE_BUSINESS,
  DELETE_BUSINESS,
  GET_BUSINESSES,
  SELECT_BUSINESS,
  CREATE_STORY,
  UPDATE_STORY,
  DELETE_STORY,
  GET_STORIES,
  REORDER_STORIES,
  SORT_STORIES_ON_DRAG,
  RESET_BUSINESS_FORM,
  UPDATE_BUSINESS_FORM,
  LOAD_STATE,
  SUCCESS,
  ADD_COMMENT_TO_STORY,
  CREATE_FILE,
  REMOVE_COMMENT_FROM_STORY,
  GET_PROJECT_LIST,
  GET_PROJECT_Error,
  GET_PROJECT_LIST_AND_APPEND,
} from './constants'

const INIT_STATE = {
  businesses: [],
  files: [],
  stories: [],
  loading: false,
  selectedBusiness: {},
  employees: [],
  projectName: '',
  projectList: [],
  totalCount: 0,
  businessForm: {
    projectType: '',
    name: '',
    challenge: '',
    role: '',
    objectives: [],
    teamDynamics: '',
    requiredSkills: [],
    goals: '',
    companyBackground: '',
    budget: '',
    questionsToAsk: [],
    stage: 1
  },
  error: ''
}

const Business = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    // case RESET_BUSINESS_FORM: {
    //   return { ...state, businessForm: INIT_STATE.businessForm }
    // }
    case CREATE_BUSINESS:
      return {
        ...state,
        loading: false,
        businesses: [...state.businesses]
      }
    case UPDATE_BUSINESS:
      const RemoveUpdateBusiness = state.businesses.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, businesses: [action.payload, ...RemoveUpdateBusiness] }
    case DELETE_BUSINESS:
      let newListBusinesses = state.businesses.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, business: [...newListBusinesses] }
    case GET_BUSINESSES:
      const selectedBusiness =
        action.payload?.limitedRecords.find(e => e.isSelected) || action.payload?.limitedRecords[0]
      return {
        ...state,
        loading: false,
        businesses: action.payload.limitedRecords,
        selectedBusiness,
        totalCount: action.payload.totalCount
      }
    case SELECT_BUSINESS:
      return {
        ...state,
        loading: false,
        selectedBusiness: action.payload,
        stories: action.payload?.stories || [],
        employees: action.payload?.employees || []
      }

    case CREATE_STORY:
      return {
        ...state,
        loading: false,
        stories: [action.payload, ...state.stories],
        createStoryForm: INIT_STATE.createStoryForm
      }
    case UPDATE_STORY:
      const RemoveUpdateStories = state.stories.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, stories: [action.payload, ...RemoveUpdateStories] }
    case REORDER_STORIES:
      return { ...state, loading: false, stories: action.payload }
    case DELETE_STORY:
      const RemoveStories = state.stories.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, stories: [...RemoveStories] }
    case SORT_STORIES_ON_DRAG:
      return { ...state, loading: false, stories: action.payload }
    case GET_STORIES:
      return { ...state, loading: false, stories: [...action.payload] }
    case ADD_COMMENT_TO_STORY:
      const updatedStories = state.stories || []
      const index = updatedStories.map(e => e._id).indexOf(action.payload._id)
      if (index !== -1) {
        updatedStories[index] = action.payload
      }
      return { ...state, loading: false, stories: [...updatedStories] }
    case REMOVE_COMMENT_FROM_STORY:
      const removeStory = state.stories.filter(e => e._id !== action.payload._id)
      return { ...state, loading: false, stories: removeStory }

    case UPDATE_BUSINESS_FORM:
      return { ...state, loading: false, businessForm: { ...state.businessForm, ...action.payload } }
    case RESET_BUSINESS_FORM:
      return { ...state, loading: false, businessForm: { ...INIT_STATE.businessForm } }
    case CREATE_FILE:
      return { ...state, loading: false, files: [...state.files, action.payload] }
    case SUCCESS:
      return { ...state, loading: true }
    case LOAD_STATE:
      return { ...state, loading: true }
    case GET_PROJECT_LIST:
      return {
        ...state,
        loading: false,
        projectList: action.payload.limitedRecords,
        totalCount: action.payload.totalCount[0]?.count
      }
    case GET_PROJECT_LIST_AND_APPEND:
      return {
        ...state,
        loading: false,
        projectList: [...state.projectList, ...action.payload.limitedRecords],
        totalCount: action.payload.totalCount[0]?.count
      }
    case GET_PROJECT_Error:
      return { ...state, loading: false, error: action.payload }

    default:
      return state
  }
}

export default Business
