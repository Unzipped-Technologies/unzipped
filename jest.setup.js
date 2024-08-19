// jest.setup.js
import '@testing-library/jest-dom'
global.setImmediate = global.setImmediate || ((fn, ...args) => setTimeout(fn, 0, ...args))
global.scrollTo = jest.fn()

global.IntersectionObserver = class IntersectionObserver {
  constructor(callback, options) {
    this.callback = callback
    this.options = options
  }

  observe(target) {
    this.callback([{ isIntersecting: true, target }])
  }

  unobserve(target) {
    // No-op
  }

  disconnect() {
    // No-op
  }
}
