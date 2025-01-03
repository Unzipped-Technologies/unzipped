import { combineReducers } from 'redux'
import Auth from './Auth/reducers'
import Dashboard from './Dashboard/reducers'
import Business from './Business/reducers'
import Freelancers from './Freelancers/reducers'
import Messages from './Messages/reducers'
import FreelancerSkills from './FreelancerSkills/reducers'
import Loading from './Loading/reducers'
import Stripe from './Stripe/reducers'
import ListEntries from './ListEntries/reducers'
import ProjectApplications from './ProjectApplications/reducers'
import Contracts from './Contract/reducers'
import Invoices from './Invoices/reducers'
import Departments from './Department/reducers'
import Tags from './Tags/reducers'
import TaskHours from './TaskHours/reducers'
import Tasks from './Tasks/reducers'
import Meetings from './Meeting/reducers'
import Lists from './Lists/ListReducer'

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
  ListEntries,
  ProjectApplications,
  Contracts,
  Invoices,
  Departments,
  Tags,
  TaskHours,
  Tasks,
  Lists
})

export default rootReducer
