import {
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_DEPARTMENTS,
  GET_DEPARTMENT_BY_ID,
  DEPARTMENT_ERROR,
  LOAD_STATE,
  SUCCESS
} from './constants'

const INIT_STATE = {
  departments: [],
  selectDepartment: {},
  error: '',
  loading: false,
  totalCount: 0
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
      const selectDepartment = action.payload?.data.find(e => e.isSelected) || action.payload?.data[0]
      return {
        ...state,
        loading: false,
        selectDepartment,
        departments: action.payload.data,
        totalCount: action.payload.totalResults
      }
    case GET_DEPARTMENT_BY_ID:
      state.departments.map(e => {
        return {
          ...e,
          isSelected: action.payload._id === e._id
        }
      })
      return {
        ...state,
        loading: false,
        selectDepartment: action.payload
      }
    case DEPARTMENT_ERROR:
      return { ...state, loading: false, error: action.payload }
    case SUCCESS:
      return { ...state, loading: true }
    case LOAD_STATE:
      return { ...state, loading: true }
    default:
      return state
  }
}

export default Departments
