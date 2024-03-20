import {
  CREATE_BUSINESS,
  UPDATE_BUSINESS,
  DELETE_BUSINESS,
  GET_BUSINESSES,
  SELECT_BUSINESS,
  RESET_BUSINESS_FORM,
  UPDATE_BUSINESS_FORM,
  LOAD_STATE,
  SUCCESS,
  CREATE_FILE,
  GET_PROJECT_LIST,
  GET_PROJECT_Error,
  GET_PROJECT_LIST_AND_APPEND,
  SUBMIT_PROJECT_WIZARD_DETAILS_ERROR,
  SUBMIT_PROJECT_WIZARD_DETAILS_SUCCESS,
  UPDATE_WIZARD_SUBMISSION
} from './constants'

const INIT_STATE = {
  wizardSubmission: {
    isSuccessfull: false,
    error: '',
    projectName: ''
  },
  departments: [],
  businesses: [],
  details: {},
  files: [],
  tags: [],
  stories: [],
  loading: false,
  selectedDepartment: 0,
  selectedBusiness: {},
  employees: [],
  invoiceTaskHours: [],
  invoiceTags: [],
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
  createStoryForm: {
    taskName: '',
    assignee: '',
    assigneeId: '',
    storyPoints: '',
    priority: 1,
    description: '',
    tagId: '',
    tagName: ''
  },
  error: ''
}

const Business = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case RESET_BUSINESS_FORM: {
      return { ...state, businessForm: INIT_STATE.businessForm }
    }
    case UPDATE_WIZARD_SUBMISSION: {
      return { ...state, wizardSubmission: { ...state.wizardSubmission, ...action.payload } }
    }
    case SUBMIT_PROJECT_WIZARD_DETAILS_SUCCESS: {
      return { ...state, loading: true, wizardSubmission: { ...state.wizardSubmission, ...action.payload } }
    }

    case SUBMIT_PROJECT_WIZARD_DETAILS_ERROR: {
      return { ...state, loading: false, wizardSubmission: { ...state.wizardSubmission, ...action.payload } }
    }
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
