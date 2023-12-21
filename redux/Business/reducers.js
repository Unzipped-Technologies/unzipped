import {
  CREATE_BUSINESS,
  UPDATE_BUSINESS,
  DELETE_BUSINESS,
  GET_BUSINESSES,
  SELECT_BUSINESS,
  CREATE_DEPARTMENT,
  UPDATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  GET_DEPARTMENTS,
  GET_DEPARTMENT_BY_ID,
  CREATE_TAG,
  UPDATE_TAG,
  GET_TAGS,
  DELETE_TAG,
  CREATE_STORY,
  UPDATE_STORY,
  DELETE_STORY,
  SELECT_DEPARTMENT,
  GET_STORIES,
  REORDER_STORIES,
  SORT_STORIES_ON_DRAG,
  DEPARTMENT_ERROR,
  RESET_BUSINESS_FORM,
  UPDATE_BUSINESS_FORM,
  LOAD_STATE,
  SUCCESS,
  ADD_COMMENT_TO_STORY,
  CREATE_FILE,
  REMOVE_COMMENT_FROM_STORY,
  UPDATE_CREATE_STORY,
  GET_PROJECT_LIST,
  GET_PROJECT_SUCCESS,
  GET_TASK_HOURS_BY_BUSINESS,
  UPDATE_TASK_HOURS_DATE,
  UPDATE_TASK_HOURS,
  UPDATE_TASK_STATUS,
  CREATE_TASK_AND_TASK_HOURS,
  GET_TASK_HOURS_BY_BUSINESS_BY_FOUNDER,
  GET_PROJECT_Error,
  GET_PROJECT_LIST_AND_APPEND
} from './constants'

const INIT_STATE = {
  departments: [],
  businesses: [],
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
    case CREATE_BUSINESS:
      return {
        ...state,
        loading: false,
        businesses: [...state.businesses, action.payload],
        selectedBusiness: action.payload
      }
    case UPDATE_BUSINESS:
      const RemoveUpdateBusiness = state.businesses.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, businesses: [action.payload, ...RemoveUpdateBusiness] }
    case DELETE_BUSINESS:
      let newListBusinesses = state.businesses.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, business: [...newListBusinesses] }
    case GET_BUSINESSES:
      const selectedBusiness = action.payload.find(e => e.isSelected) || action.payload[0]
      return { ...state, loading: false, businesses: action.payload, selectedBusiness }
    case SELECT_BUSINESS:
      return {
        ...state,
        loading: false,
        selectedBusiness: action.payload,
        stories: action.payload?.stories || [],
        employees: action.payload?.employees || []
      }
    case CREATE_DEPARTMENT:
      return { ...state, loading: false, departments: action.payload }
    case UPDATE_DEPARTMENT:
      const RemoveUpdateItem = state.departments.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, departments: [action.payload, ...RemoveUpdateItem] }
    case DELETE_DEPARTMENT:
      let newList = state.departments.filter(item => action.payload.id !== item.id)
      return { ...state, loading: false, departments: [...newList] }
    case GET_DEPARTMENT_BY_ID:
      const depart = state.departments.map(e => {
        return {
          ...e,
          isSelected: action.payload._id === e._id
        }
      })
      return {
        ...state,
        loading: false,
        selectedDepartment: action.payload,
        departments: depart,
        tags: action.payload.tags,
        stories: action.payload?.tasks
      }
    case GET_DEPARTMENTS:
      const selectedDepartment = action.payload.find(e => e.isSelected) || action.payload[0]
      return { ...state, loading: false, departments: action.payload, selectedDepartment }
    case CREATE_TAG:
      return { ...state, loading: false, tags: [...state.tags, action.payload] }
    case UPDATE_TAG:
      const RemoveUpdateItems = state.tags.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, tags: [action.payload, ...RemoveUpdateItems] }
    case DELETE_TAG:
      const RemoveTag = state.tags.filter(item => item.id !== action.payload.id)
      return { ...state, loading: false, tags: [...RemoveTag] }
    case GET_TAGS:
      return { ...state, loading: false, tags: [...action.payload] }
    case UPDATE_CREATE_STORY:
      return { ...state, loading: false, createStoryForm: { ...state.createStoryForm, ...action.payload } }
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
    case SELECT_DEPARTMENT:
      return {
        ...state,
        loading: false,
        selectedDepartment: action.payload.selected,
        stories: [...action.payload.stories]
      }
    case DEPARTMENT_ERROR:
      return { ...state, loading: false, error: action.payload }
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
    case CREATE_TASK_AND_TASK_HOURS:
      const createdTask = {
        updatedAt: action.payload.updatedAt,
        isDeleted: action.payload.isDeleted,
        deletedAt: action.payload.deletedAt,
        userId: action.payload.userId,
        storyPoints: action.payload.taskId.storyPoints,
        taskName: action.payload.taskId.taskName,
        tagName: action.payload.taskId.tag.tagName,
        tag: action.payload.taskId.tag._id,
        hours: action.payload.hours,
        departmentId: action.payload.departmentId,
        createdAt: action.payload.createdAt,
        _id: action.payload._id
      }
      return { ...state, loading: false, invoiceTaskHours: [...state.invoiceTaskHours, createdTask] }
    case UPDATE_TASK_STATUS:
      const updatedStatus = state.invoiceTaskHours.map(task => {
        const updatedTask = {
          ...task
        }

        if (task._id === action.payload._id) {
          updatedTask.tagName = action.payload.tagName
          updatedTask.tag = action.payload.tag
        }

        return updatedTask
      })
      return { ...state, loading: false, invoiceTaskHours: updatedStatus }
    case UPDATE_TASK_HOURS:
      const updatedHours = state.invoiceTaskHours.map(task => {
        const updatedTask = {
          ...task
        }

        if (task._id === action.payload._id) {
          updatedTask.hours = action.payload.hours
        }

        return updatedTask
      })
      return { ...state, loading: false, invoiceTaskHours: updatedHours }
    case UPDATE_TASK_HOURS_DATE:
      const updatedTasks = state.invoiceTaskHours.map(task => {
        const updatedTask = {
          ...task
        }

        if (task._id === action.payload._id) {
          updatedTask.updatedAt = action.payload.updatedAt
        }

        return updatedTask
      })
      return { ...state, loading: false, invoiceTaskHours: updatedTasks }
    case GET_TASK_HOURS_BY_BUSINESS_BY_FOUNDER:
      const findEmployeeRate = (dep, user) => {
        const employee = action.payload.businessDetails.employees.find(
          emp => emp.departmentId === dep && emp.freelancerId.userId === user
        )
        return employee ? employee.hourlyRate : undefined
      }
      const taskHoursByFounderBusiness = action?.payload?.results?.map(task => ({
        updatedAt: task.updatedAt,
        isDeleted: task.isDeleted,
        deletedAt: task.deletedAt,
        userId: task.userId,
        storyPoints: task.taskId.storyPoints,
        taskName: task.taskId.taskName,
        tagName: task.taskId.tag.tagName,
        tag: task.taskId.tag._id,
        hours: task.hours,
        departmentId: task.departmentId,
        createdAt: task.createdAt,
        rate: findEmployeeRate(task.departmentId, task.userId._id),
        _id: task._id
      }))
      const projectName = action.payload.businessDetails.name
      return { ...state, loading: false, invoiceTaskHours: taskHoursByFounderBusiness, projectName: projectName }
    case GET_TASK_HOURS_BY_BUSINESS:
      const invoiceTaskHour = action.payload.taskHours.map(task => ({
        updatedAt: task.updatedAt,
        isDeleted: task.isDeleted,
        deletedAt: task.deletedAt,
        userId: task.userId,
        storyPoints: task.taskId.storyPoints,
        taskName: task.taskId.taskName,
        tagName: task.taskId.tag.tagName,
        tag: task.taskId.tag._id,
        hours: task.hours,
        departmentId: task.departmentId,
        createdAt: task.createdAt,
        rate: action.payload.ContractRate.hourlyRate,
        _id: task._id
      }))
      const projName = action.payload?.ContractRate?.businessId?.name
      return {
        ...state,
        loading: false,
        invoiceTaskHours: invoiceTaskHour,
        invoiceTags: action.payload.tags,
        projectName: projName
      }
    default:
      return state
  }
}

export default Business
