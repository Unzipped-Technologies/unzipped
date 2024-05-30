// testUtils/mockStore.js
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import Auth from '../redux/Auth/reducers'
import Stripe from '../redux/Stripe/reducers'
import Business from '../redux/Business/reducers'
// Import other reducers as necessary

const combinedReducer = combineReducers({
  Auth,
  Stripe,
  Business
  // Add other reducers
})

export const initialState = {
  Auth: {
    token: 'testToken',
    user: { FirstName: 'test', LastName: 'User', stripeAccountId: 'testStripeId', email: 'test@example.com' }
  },
  Stripe: {
    methods: ['method1', 'method2'],
    url: 'testUrl',
    balance: {
      available: [{ amount: 100 }]
    }
  },
  Business: {
    details: { name: 'testBusiness' }
  }
  // Add other initial state slices as needed
}

export const configureTestStore = (state = initialState) => {
  return createStore(combinedReducer, state, composeWithDevTools(applyMiddleware(thunk)))
}
