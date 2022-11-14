import {
    VEHICLE_LOADING,
    VEHICLE_MAKE,
    VEHICLE_MODEL,
    VEHICLE_ERROR,
    MODEL_LOADING,
    MAKE_LOADING,
    VEHICLE_SPACE,
    CLEAR_VEHICLE,
} from './constants';

const INIT_STATE = {
    makeLoading: false,
    modelLoading: false,
    make: [],
    model: [],
    error: ''
}

const Vehicle = (state = INIT_STATE, action = {}) => {
    switch (action.type) {
        case VEHICLE_LOADING:
            return {...state, loading: true};
        case MAKE_LOADING:
            return {...state, makeLoading: true, make: []};
        case MODEL_LOADING:
            return {...state, modelLoading: true, model: []};
        case VEHICLE_MAKE:
            return {...state, loading: false, makeLoading: false, make: [...action.payload], model: []};
        case VEHICLE_MODEL:
            return {...state, loading: false, modelLoading: false, model: [...action.payload]};
        case VEHICLE_ERROR:
            return {...state, loading: false, error: action.payload};
        case CLEAR_VEHICLE:
            return {...INIT_STATE};
        default: 
            return state;
    }
}

export default Vehicle;