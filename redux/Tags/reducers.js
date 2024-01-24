import { CREATE_TAG, UPDATE_TAG, GET_TAGS, DELETE_TAG, LOAD_STATE, SUCCESS, TAG_ERROR } from './constants'

const INIT_STATE = {
  tags: [],
  selectedContract: {},
  error: '',
  loading: false,
  totalCount: 0
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
    default:
      return state
  }
}

export default Tags
