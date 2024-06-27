// src/testUtils/mockReduxPersist.js
jest.mock('redux-persist', () => {
  return {
    persistReducer: jest.fn((config, reducers) => reducers),
    persistStore: jest.fn(store => store)
  }
})
