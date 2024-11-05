import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { render } from '@testing-library/react'
import { createStore, applyMiddleware, combineReducers } from 'redux'

import thunkMiddleware from 'redux-thunk'
// import configureMockStore from 'redux-mock-store'

import rootReducer from '../../redux/reducers'

const configureStore = (initialState = {}) => {
  return createStore(rootReducer, initialState, applyMiddleware(thunkMiddleware))
}

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)

export const renderWithRedux = (component, { initialState, store = configureStore(initialState) } = {}) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  }
}
