import {combineReducers} from 'redux';
import Booking from './booking/reducers';
import Auth from './Auth/reducers';
import Vehicle from './vehicle/reducers';
import Dashboard from './Dashboard/reducers';
import Business from './Business/reducers';
import Freelancers from './Freelancers/reducers';

const rootReducer = combineReducers({
    // counter: counterReducer
    Booking,
    Auth,
    Vehicle,
    Dashboard,
    Business,
    Freelancers
});

export default rootReducer;