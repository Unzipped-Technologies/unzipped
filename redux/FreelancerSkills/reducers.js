import {
    FREELANCERSKILLS_ERROR,
    GET_LIST_FREELANCERSKILLS,
    GET_ALL_FREELANCERS,
    GET_ALL_FREELANCERS_ERROR
} from './constants';

const INIT_STATE = {
    freelancerSkills: [],
    error: null,
    allFreelancers: []
}

const FreelancerSkills = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_FREELANCERSKILLS:
            return { ...state, freelancerSkills: [...action.payload] };
        case GET_ALL_FREELANCERS:
            return { ...state, allFreelancers: [...action.payload] };
        case FREELANCERSKILLS_ERROR:
            return { ...state, error: action.payload };
        case GET_ALL_FREELANCERS_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default FreelancerSkills;