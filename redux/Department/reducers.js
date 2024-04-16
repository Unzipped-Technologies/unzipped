import {
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_DEPARTMENTS,
  GET_DEPARTMENT_BY_ID,
  DEPARTMENT_ERROR,
  UPDATE_DEPARTMENT_FORM,
  RESET_DEPARTMENT_FORM,
  LOAD_STATE,
  SUCCESS
} from './constants'

const INITIAL_DEPARTMENT_FORM = {
  businessId: ' ',
  name: ''
}

const INIT_STATE = {
  departments: [],
  selectedDepartment: {},
  error: '',
  loading: false,
  totalCount: 0,
  createDepartmentForm: {
    ...INITIAL_DEPARTMENT_FORM
  }
}

const Departments = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case CREATE_DEPARTMENT:
      return {
        ...state,
        loading: false,
        departments: [...state.departments]
      }
    case UPDATE_DEPARTMENT:
      const RemoveUpdateDepartment = state.departments.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, departments: [action.payload, ...RemoveUpdateDepartment] }
    case DELETE_DEPARTMENT:
      let newListDepartments = state.departments.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, departments: [...newListDepartments] }
    case GET_DEPARTMENTS:
      const selectedDepartment = action.payload?.data.find(e => e.isSelected) || action.payload?.data[0]
      return {
        ...state,
        loading: false,
        selectedDepartment,
        departments: action.payload.data,
        totalCount: action.payload.totalResults
      }
    case GET_DEPARTMENT_BY_ID:
      state.departments.map(e => {
        return {
          ...e,
          isSelected: action.payload?._id === e?._id
        }
      })
      return {
        ...state,
        loading: false,
        selectedDepartment: action.payload
      }
    case DEPARTMENT_ERROR:
      return { ...state, loading: false, error: action.payload }
    case SUCCESS:
      return { ...state, loading: true }
    case LOAD_STATE:
      return { ...state, loading: true }
    case UPDATE_DEPARTMENT_FORM:
      return {
        ...state,
        loading: false,
        createDepartmentForm: { ...state.createDepartmentForm, ...action.payload }
      }
    case RESET_DEPARTMENT_FORM:
      return {
        ...state,
        loading: false,
        tags: [...state.tags],
        createDepartmentForm: { ...INITIAL_DEPARTMENT_FORM },
        selectedDepartment: {}
      }
    default:
      return state
  }
}

export default Departments
