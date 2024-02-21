import {
    FREELANCERSKILLS_ERROR,
    GET_LIST_FREELANCERSKILLS,
    GET_ALL_FREELANCERS,
    GET_ALL_FREELANCERS_ERROR,
    CREATE_USER_INVITATION_SUCCESS
} from './constants';

const INIT_STATE = {
    freelancerSkills: [],
    error: null,
    allFreelancers: [],
    createdInvitation: null,
    freelancersTotalCount: 0
}

const FreelancerSkills = (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_LIST_FREELANCERSKILLS:
            return { ...state, freelancerSkills: [...action.payload] };
        case GET_ALL_FREELANCERS:
            return { ...state, allFreelancers: [...action.payload[0].freelancers], freelancersTotalCount: action?.payload[0].totalCount[0].count || 0 };
        case FREELANCERSKILLS_ERROR:
            return { ...state, error: action.payload };
        case GET_ALL_FREELANCERS_ERROR:
            return { ...state, error: action.payload };
        case CREATE_USER_INVITATION_SUCCESS:
            {
                return { ...state, loading: false, createdInvitation: action.payload };
            }
        default:
            return state;
    }
};

export default FreelancerSkills;