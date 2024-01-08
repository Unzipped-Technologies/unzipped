import { combineReducers } from 'redux'
import Auth from './Auth/reducers'
import Dashboard from './Dashboard/reducers'
import Business from './Business/reducers'
import Freelancers from './Freelancers/reducers'
import Messages from './Messages/reducers'
import FreelancerSkills from './FreelancerSkills/reducers'
import Loading from './Loading/reducers'
import Stripe from './Stripe/reducers'
import ProjectApplications from './ProjectApplications/reducers'
import Contracts from './Contract/reducers'

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
  ProjectApplications,
  Contracts
})

export default rootReducer
