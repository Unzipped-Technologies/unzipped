import { CREATE_TASK, UPDATE_TASK, GET_TASKS, DELETE_TASK, LOAD_STATE, SUCCESS, TASK_ERROR } from './constants'

const INIT_STATE = {
  tasks: [],
  selectedContract: {},
  error: '',
  loading: false,
  totalCount: 0
}

const Tasks = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case CREATE_TASK:
      return { ...state, loading: false, tasks: [...state.tasks, action.payload] }
    case UPDATE_TASK:
      const RemoveUpdateItems = state.tasks.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, tasks: [action.payload, ...RemoveUpdateItems] }
    case DELETE_TASK:
      const RemoveTag = state.tasks.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, tasks: [...RemoveTag] }
    case GET_TASKS:
      return { ...state, loading: false, tasks: [...action.payload] }
    default:
      return state
  }
}

export default Tasks
