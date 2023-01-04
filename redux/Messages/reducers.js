import {
    MESSAGES_LOADING,
    GET_CONVERSATIONS,
    SEND_MESSAGE,
    ARCHIVE_CONVERSATION,
    SELECT_CONVERSATION,
    MESSAGE_ERROR,
} from './constants';

const INIT_STATE = {
    conversations: [],
    loading: false,
    selectedConversation: null,
    messageForm: {
        attachment: '',
        message: '',
    },
    error: null,
}


const Messages = (state = INIT_STATE, action) => {
    switch (action.type) {
        case MESSAGES_LOADING:
            return { ...state, loading: true };
        case GET_CONVERSATIONS:
            const convoList = action.payload.sort((a, b) => a?.updatedAt - b?.updatedAt)
            convoList[0] = {...action.payload[0], isSelected: true}
            return { ...state, loading: false, conversations: [...convoList], selectedConversation: convoList };
        case SELECT_CONVERSATION:
            const newConversation = state.conversations
            const indexToUpdate = newConversation.map(e => e._id).indexOf(action.payload._id)
            const updateSelected = newConversation.map(e => {
                return {...e, isSelected: false}
            })
            updateSelected[indexToUpdate] = {...action.payload, isSelected: true}
            return { ...state, loading: false, error: null, conversations: [...updateSelected], selectedConversation: {...action.payload, isSelected: true} };
        case SEND_MESSAGE:
            const existingConversations = state.conversations.filter(e => e._id !== action.payload._id)
            return { ...state, loading: false, selectedConversation: action.payload, conversations: [action.payload, ...existingConversations]};
        case ARCHIVE_CONVERSATION:
            return { ...state, loading: true, conversation: action.payload };
        case MESSAGE_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default Messages;