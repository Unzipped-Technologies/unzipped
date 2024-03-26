import {
  CREATE_TASK_HOUR,
  UPDATE_TASK_HOUR,
  GET_TASK_HOURS,
  DELETE_TASK_HOUR,
  LOAD_STATE,
  SUCCESS,
  TASK_HOUR_ERROR
} from './constants'

const INIT_STATE = {
  taskHours: [],
  selectedContract: {},
  error: '',
  loading: false,
  totalCount: 0
}

const Taskhours = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case CREATE_TASK_HOUR:
      return { ...state, loading: false, taskHours: [...state.taskHours, action.payload] }
    case UPDATE_TASK_HOUR:
      const RemoveUpdateItems = state.taskHours.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, taskHours: [action.payload, ...RemoveUpdateItems] }
    case DELETE_TASK_HOUR:
      const RemoveTag = state.taskHours.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, taskHours: [...RemoveTag] }
    case GET_TASK_HOURS:
      return { ...state, loading: false, taskHours: [...action.payload] }
    default:
      return state
  }
}

export default Taskhours
