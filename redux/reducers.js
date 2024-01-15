import {combineReducers} from 'redux';
import Auth from './Auth/reducers';
import Dashboard from './Dashboard/reducers';
import Business from './Business/reducers';
import Freelancers from './Freelancers/reducers';
import Messages from './Messages/reducers';
import FreelancerSkills from './FreelancerSkills/reducers';
import Loading from './Loading/reducers';
import Stripe from './Stripe/reducers';
import Meetings from './Meeting/reducers';

const rootReducer = combineReducers({
    // counter: counterReducer
    Auth,
    Dashboard,
    Business,
    Freelancers,
    Messages,
    FreelancerSkills,
    Loading,
    Stripe,
    Meetings
});

export default rootReducer;