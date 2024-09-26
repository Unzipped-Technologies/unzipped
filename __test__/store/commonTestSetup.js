import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
import { Provider } from 'react-redux'
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
