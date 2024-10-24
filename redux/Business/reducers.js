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
  UPDATE_WIZARD_SUBMISSION,
  SET_IS_BUSINESS_FIELD_SUBMITTED,
  SET_PROJECT_FILES,
  RESET_PROJECT_FILES,
  GET_BUSINESS_DETAILS,
  GET_BUSINESS_CREATED_BY_USER_SUCCESS,
  GET_BUSINESS_CREATED_BY_USER_FAILED,
  GET_BUSINESS_EMPLOYEES,
  GET_BUSINESS_EMPLOYEES_FAILED,
  RESET_HIRED_EMPLOYEES,
  RESET_HIRED_EMPLOYEES_FAILED,
  GET_BUSINESS_INFO_TASKLIST_PANEL,
  LOAD_BUSINESS_ASSOCIATED_TASK_FULL_VIEW,
  REST_BUSINESS_LIST,
  UPDATE_BUSINESS_DETAILS
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
  selectedBusiness: null,
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
    budgetRange: '',
    questionsToAsk: [],
    stage: 1,
    isFieldSubmitted: false
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
  error: '',
  userOwnedBusiness: [],
  hiredProjectTeam: [],
  taskListBusiness: [],
  fullBoardViewTickets: []
}

const Business = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case RESET_BUSINESS_FORM: {
      return {
        ...state,
        businessForm: INIT_STATE.businessForm,
        wizardSubmission: { ...state.wizardSubmission, ...action.payload }
      }
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
      return {
        ...state,
        loading: false,
        businessForm: { ...state.businessForm, ...action.payload },
        wizardSubmission: { ...state.wizardSubmission, ...action.payload, isSuccessfull: false }
      }
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

    case SET_IS_BUSINESS_FIELD_SUBMITTED:
      return { ...state, businessForm: { ...state.businessForm, isFieldSubmitted: action.payload } }

    case SET_PROJECT_FILES:
      return { ...state, files: action.payload }
    case RESET_PROJECT_FILES:
      return { ...state, files: [] }

    case GET_BUSINESS_DETAILS:
      return { ...state, loading: false, details: action.payload }

    case GET_BUSINESS_CREATED_BY_USER_SUCCESS:
      return { ...state, loading: false, userOwnedBusiness: action.payload }

    case GET_BUSINESS_CREATED_BY_USER_FAILED:
      return { ...state, loading: false, userOwnedBusiness: [] }

    case GET_BUSINESS_EMPLOYEES:
      return { ...state, loading: false, hiredProjectTeam: action.payload}

    case RESET_HIRED_EMPLOYEES:
      return { ...state, loading: false, hiredProjectTeam: [] }
    case GET_BUSINESS_INFO_TASKLIST_PANEL:
      {
        return { ...state, loading: false, taskListBusiness: action.payload }
      }
    case LOAD_BUSINESS_ASSOCIATED_TASK_FULL_VIEW:
      {
        return { ...state, loading: false, fullBoardViewTickets: action.payload }
      }
    case REST_BUSINESS_LIST: {
      return { ...state, loading: false, fullBoardViewTickets: [] }
    }
    case UPDATE_BUSINESS_DETAILS:
      return { ...state, loading: false, details: action.payload }

    default:
      return state
  }
}

export default Business
