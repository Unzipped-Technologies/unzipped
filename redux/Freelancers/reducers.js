import {
    FREELANCER_LOADING,
    GET_LIST_FREELANCERS,
    GET_FREELANCER_BY_ID,
    RESET_SELECTED_FREELANCER,
    FREELANCER_ERROR,
} from './constants';

const INIT_STATE = {
    freelancers: [],
    loading: false,
    selectedFreelancer: null,
    error: null,
    totalCount: ''
}

const Freelancers = (state = INIT_STATE, action) => {

    switch (action.type) {
        case FREELANCER_LOADING:
            return { ...state, loading: true };
        case GET_LIST_FREELANCERS:
            return { ...state, loading: false, freelancers: [...action?.payload?.limitedRecords], totalCount: action?.payload?.totalCount };
        case GET_FREELANCER_BY_ID:
            return { ...state, loading: false, selectedFreelancer: action.payload };
        case RESET_SELECTED_FREELANCER:
            return { ...state, loading: true, selectedFreelancer: null };
        case FREELANCER_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default Freelancers;