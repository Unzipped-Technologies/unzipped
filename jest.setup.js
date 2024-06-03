// jest.setup.js
import '@testing-library/jest-dom'
global.setImmediate = global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args))
