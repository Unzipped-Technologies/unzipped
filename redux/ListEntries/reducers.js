import {
    GET_LIST_ENTRIES,
    GET_LIST_ENTRIES_BY_ID,
    GET_LIST_ENTRIES_BY_ID_ERROR,
    GET_LIST_ENTRIES_BY_ID_SUCCESS,
    GET_LIST_ENTRIES_ERROR,
    GET_LIST_ENTRIES_SUCCESS,
    GET_USERS_LIST_BY_USER_ID,
    GET_USERS_LIST_BY_USER_ID_ERROR,
    GET_USERS_LIST_BY_USER_ID_SUCCESS,
    GET_USERS_LIST_SUCCESSS,
    GET_TEAM_MEMBER_LIST,
    GET_TEAM_MEMBER_LIST_SUCCESS,
    GET_TEAM_MEMBER_LIST_ERROR,
    CREATE_RECENTLY_VIEWED_LIST,
    CREATE_RECENTLY_VIEWED_LIST_SUCCESS,
    CREATE_RECENTLY_VIEWED_LIST_ERROR,
    GET_RECENTLY_VIEWED_LIST,
    GET_RECENTLY_VIEWED_LIST_SUCCESS,
    GET_RECENTLY_VIEWED_LIST_ERROR,
} from './constant';

const INIT_STATE = {
    loading: false,
    listEntries: [],
    userLists: [],
    teamMembers: [],
    recentlyViewedList: [],
    recentlyViewedRecord: null,
    error: null,
}

const ListEntries = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Recently Viewed Records
        case GET_RECENTLY_VIEWED_LIST:
            {
                return { ...state, loading: true };
            }


        case GET_RECENTLY_VIEWED_LIST_SUCCESS:
            {
                return { ...state, loading: false, recentlyViewedList: [...action?.payload] };
            }

        case GET_RECENTLY_VIEWED_LIST_ERROR:
            return { ...state, loading: false, error: action.payload };

        // Create Recently Viewed Record
        case CREATE_RECENTLY_VIEWED_LIST:
            {
                return { ...state, loading: true };
            }

        case CREATE_RECENTLY_VIEWED_LIST_SUCCESS:
            {
                return { ...state, loading: false, recentlyViewedRecord: [...action?.payload] };
            }

        case CREATE_RECENTLY_VIEWED_LIST_ERROR:
            return { ...state, loading: false, error: action.payload };

        // Get All List Entries
        case GET_LIST_ENTRIES:
            {
                return { ...state, loading: true };
            }

        case GET_LIST_ENTRIES_SUCCESS:
            {
                return { ...state, loading: false, listEntries: [...action?.payload] };
            }

        case GET_LIST_ENTRIES_ERROR:
            return { ...state, loading: false, error: action.payload };

        case GET_USERS_LIST_BY_USER_ID:
            {
                return { ...state, loading: true };
            }

        case GET_USERS_LIST_BY_USER_ID_SUCCESS:
            {
                return { ...state, loading: false, userLists: [...action?.payload] };
            }
        case GET_USERS_LIST_BY_USER_ID_ERROR:
            return { ...state, loading: false, error: action.payload };

        //  Get list entries by listId

        case GET_LIST_ENTRIES_BY_ID:
            {
                return { ...state, loading: true, listEntries: [] };
            }
        case GET_LIST_ENTRIES_BY_ID_SUCCESS:
            {
                return { ...state, loading: false, listEntries: [...action?.payload] };
            }
        case GET_LIST_ENTRIES_BY_ID_ERROR:
            return { ...state, loading: false, error: action.payload };

        // Get Team Member details

        case GET_TEAM_MEMBER_LIST:
            {
                return { ...state, loading: true };
            }
        case GET_TEAM_MEMBER_LIST_SUCCESS:
            {
                return { ...state, loading: false, teamMembers: [...action?.payload] }
            }

        case GET_TEAM_MEMBER_LIST_ERROR:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};


export default ListEntries;