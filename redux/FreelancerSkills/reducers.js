import {
    FREELANCERSKILLS_ERROR,
    GET_LIST_FREELANCERSKILLS,
} from './constants';

const INIT_STATE = {
    freelancerSkills: [],
    error: null,
}

const FreelancerSkills = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_FREELANCERSKILLS:
            return { ...state, freelancerSkills: [...action.payload] };
        case FREELANCERSKILLS_ERROR:
            return { ...state, error: action.payload };
        default:
            return state;
    }
};

export default FreelancerSkills;