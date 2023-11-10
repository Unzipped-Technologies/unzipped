import {
    START_LOADING,
    STOP_LOADING,
} from './constants';

const INIT_STATE = {
    loading: false,
}

const Loading = (state = INIT_STATE, action) => {
    switch (action.type) {
        case START_LOADING:
            return { ...state, loading: true };
        case STOP_LOADING:
            return { ...state, loading: false };
        default:
            return state;
    }
};


export default Loading;