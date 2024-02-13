import {
  CREATE_TAG,
  UPDATE_TAG,
  GET_TAGS,
  DELETE_TAG,
  UPDATE_TAG_FORM,
  RESET_TAG_FORM,
  LOAD_STATE,
  SUCCESS,
  TAG_ERROR
} from './constants'

const INITIAL_TAG_FORM = {
  tagName: ' ',
  isActive: true,
  isArchived: false,
  departmentId: ''
}

const INIT_STATE = {
  tags: [],
  error: '',
  loading: false,
  totalCount: 0,
  selectedTag: {},
  createTagForm: {
    ...INITIAL_TAG_FORM
  }
}

const Tags = (state = INIT_STATE, action = {}) => {
  switch (action.type) {
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
    case UPDATE_TAG_FORM:
      return {
        ...state,
        loading: false,
        createTagForm: { ...state.createTagForm, ...action.payload }
      }
    case RESET_TAG_FORM:
      return {
        ...state,
        loading: false,
        tags: [...state.tags],
        createTagForm: { ...INITIAL_TASKS },
        selectedTag: {}
      }
    default:
      return state
  }
}

export default Tags
