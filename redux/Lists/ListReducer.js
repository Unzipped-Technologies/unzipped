import {
    CREATE_USER_LIST,
    CREATE_USER_LIST_ERROR,
    CREATE_USER_LIST_SUCCESS,

    EDIT_USER_LIST,
    EDIT_USER_LIST_ERROR,
    EDIT_USER_LIST_SUCCESS,

    ON_UPDATE_LIST
} from "./constant";


const INIT_STATE = {
    loading: false,
    list: null,
    error: null,
    updatedList: null
}


const Lists = (state = INIT_STATE, action) => {
    switch (action.type) {
        // Create New Lists
        case CREATE_USER_LIST:
            {
                return { ...state, loading: true };
            }

        case CREATE_USER_LIST_SUCCESS:
            {
                return { ...state, loading: false, list: { ...action?.payload } }
            }

        case CREATE_USER_LIST_ERROR:
            {
                return { ...state, loading: false, error: action.payload };
            }

        // Edit  Lists
        case EDIT_USER_LIST:
            {
                return { ...state, loading: true };
            }

        case EDIT_USER_LIST_SUCCESS:
            {
                return { ...state, loading: false, list: { ...action?.payload } }
            }

        case EDIT_USER_LIST_ERROR:
            {
                return { ...state, loading: false, error: action.payload };
            }
        
        case ON_UPDATE_LIST:
            {
                return { ...state, updatedList: { ...action?.payload } }
            }
        default:
            return state;
    }
};

export default Lists;