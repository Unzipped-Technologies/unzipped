// import React from 'react'
// import { Provider } from 'react-redux'
// import { render } from '@testing-library/react'
// import configureMockStore from 'redux-mock-store'
// import thunk from 'redux-thunk'

// const middlewares = [thunk]
// const mockStore = configureMockStore(middlewares)

// export const renderWithRedux = (component, { initialState, store = mockStore(initialState) } = {}) => {
//   return {
//     ...render(<Provider store={store}>{component}</Provider>),
//     store
//   }
// }

import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { render } from '@testing-library/react'

import rootReducer from '../../redux/reducers'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

export const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState, applyMiddleware(thunk)) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  }
}
