import {combineReducers} from 'redux';
import Booking from './booking/reducers';
import Auth from './Auth/reducers';
import Vehicle from './vehicle/reducers';
import Dashboard from './Dashboard/reducers';

const rootReducer = combineReducers({
    // counter: counterReducer
    Booking,
    Auth,
    Vehicle,
    Dashboard,
});

export default rootReducer;