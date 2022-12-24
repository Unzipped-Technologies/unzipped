import {
    FREELANCER_LOADING,
    GET_LIST_FREELANCERS,
    FREELANCER_ERROR,
} from './constants';

const INIT_STATE = {
    freelancers: [],
    loading: false,
    error: null,
}


const Freelancers = (state = INIT_STATE, action) => {
    switch (action.type) {
        case FREELANCER_LOADING:
            return { ...state, loading: true };
        case GET_LIST_FREELANCERS:
            console.log(action.payload)
            return { ...state, loading: false, freelancers: [...action.payload] };
        case FREELANCER_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};


export default Freelancers;