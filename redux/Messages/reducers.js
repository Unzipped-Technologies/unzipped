import {
  MESSAGES_LOADING,
  GET_CONVERSATIONS,
  SELECT_CONVERSATION,
  MESSAGE_ERROR,
  UPDATE_CONVERSATION_STATUS,
  UPDATE_CONVERSATION_MESSAGE,
  SET_COUNT_ZERO,
  RESET_MESSAGE_STORE
} from './constants'

const INIT_STATE = {
  conversations: [],
  loading: false,
  selectedConversation: null,
  messageForm: {
    attachment: '',
    message: ''
  },
  conversationId: '',
  messagesCount: null,
  error: null
}

const Messages = (state = INIT_STATE, action) => {
  switch (action.type) {
    case MESSAGES_LOADING:
      return { ...state, loading: true }
    case GET_CONVERSATIONS:
      const convoList = action.payload.sort((a, b) => a?.updatedAt - b?.updatedAt)
      return {
        ...state,
        loading: false,
        conversations: [...convoList],
        selectedConversation: state.selectedConversation || convoList[0]
      }
    case SELECT_CONVERSATION:
      const newConversation = state.conversations
      const indexToUpdate = newConversation.map(e => e._id).indexOf(action.payload.updatedConversation._id)
      const updateSelected = newConversation.map(e => {
        return { ...e, isSelected: false }
      })
      updateSelected[indexToUpdate] = {
        ...action.payload.updatedConversation,
        isSelected: true
      }
      return {
        ...state,
        loading: false,
        error: null,
        selectedConversation: {
          ...action.payload.updatedConversation,
          isSelected: true
        },
        conversationId: action.payload?.updatedConversation?._id,
        messagesCount: action.payload?.count
      }
    case MESSAGE_ERROR:
      return { ...state, loading: false, error: action.payload }
    case UPDATE_CONVERSATION_STATUS:
      const updatedConversations = state.conversations.map(conversation => {
        if (conversation?._id === state.conversationId) {
          return {
            ...conversation,
            [action.payload === 'isMute' ? 'isMute' : 'isArchived']:
              action.payload === 'isMute' ? !conversation?.isMute : !conversation?.isArchived
          }
        }
        return conversation
      })
      return {
        ...state,
        conversations: updatedConversations,
        selectedConversation: updatedConversations.find(conversation => conversation._id === state.conversationId)
      }
    case UPDATE_CONVERSATION_MESSAGE:
      const newMessage = {
        message: action.payload.message,
        createdAt: new Date().toISOString(),
        isRead: false,
        isActive: true,
        isAlert: false,
        isSingle: true,
        attachment: '',
        updatedAt: new Date().toISOString()
      }
      const updatedMessages = state.conversations.map(conversation => {
        if (conversation._id === action.payload.conversationId) {
          return {
            ...conversation,
            messages: [...conversation.messages, newMessage],
            participants: conversation?.participants?.map(participant => {
              if (participant.userId?._id === action.payload?.receiver?.userId && action?.payload?.unreadCount) {
                return {
                  ...participant,
                  unreadCount: +participant.unreadCount + 1
                }
              } else {
                return {
                  ...participant,
                  unreadCount: 0
                }
              }
            })
          }
        }
        return conversation
      })

      return { ...state, conversations: updatedMessages }

    case SET_COUNT_ZERO:
      const newConversations = state.conversations.map(conversation => {
        if (conversation._id === action.payload.conversationid) {
          return {
            ...conversation,
            participants: conversation?.participants?.map(participant => {
              if (participant?.userId?._id === action.payload?.receiverId) {
                return {
                  ...participant,
                  unreadCount: 0
                }
              } else {
                return {
                  ...participant
                }
              }
            })
          }
        }
        return conversation
      })
      return { ...state, conversations: newConversations }

    case RESET_MESSAGE_STORE:
      return {
        ...state,
        loading: false,
        conversations: [],
        selectedConversation: null,
        messageForm: {
          attachment: '',
          message: ''
        },
        conversationId: '',
        messagesCount: null,
        error: null
      }

    default:
      return state
  }
}

export default Messages
