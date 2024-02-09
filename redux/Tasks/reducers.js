import {
  CREATE_TASK,
  UPDATE_TASK,
  GET_TASKS,
  DELETE_TASK,
  UPDATE_CREATE_STORY,
  RESET_STORY_FORM,
  SET_DEPARTMENT,
  GET_TASK_BY_ID,
  SET_CURRENT_TICKET,
  LOAD_STATE,
  SUCCESS,
  TASK_ERROR
} from './constants'

const INITIAL_TASKS = {
  taskName: ' ',
  storyPoints: 0,
  priority: '',
  order: 1,
  description: '',
  status: '',
  businessId: '',
  departmentId: '',
  assignee: '',
  tag: '',
  ticketCode: '',
  comments: []
}

const INIT_STATE = {
  tasks: [],
  selectedTask: {},
  error: '',
  loading: false,
  totalCount: 0,
  currentDepartment: {},
  createStoryForm: {
    ...INITIAL_TASKS
  }
}

const Tasks = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks, action.payload],
        createStoryForm: { ...INITIAL_TASKS }
      }
    case UPDATE_TASK:
      const RemoveUpdateItems = state.tasks.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, tasks: [action.payload, ...RemoveUpdateItems] }
    case DELETE_TASK:
      const RemoveTag = state.tasks.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, tasks: [...RemoveTag] }
    case GET_TASKS:
      return { ...state, loading: false, tasks: [...action.payload.data] }
    case GET_TASK_BY_ID:
      return { ...state, loading: false, selectedTask: action.payload }
    case UPDATE_CREATE_STORY:
      if (Object.keys(action.payload).includes('comments')) {
        state.createStoryForm.comments = [...state.createStoryForm.comments, ...action.payload.comments] // Add new comment to the end of the comments array
      }
      return {
        ...state,
        loading: false,
        createStoryForm: { ...state.createStoryForm, ...action.payload }
      }
    case RESET_STORY_FORM:
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks],
        createStoryForm: { ...INITIAL_TASKS }
      }
    case SET_DEPARTMENT:
      return { ...state, loading: false, currentDepartment: action.payload }
    case SET_CURRENT_TICKET:
      return { ...state, loading: false, selectedTask: action.payload }
    default:
      return state
  }
}

export default Tasks
