const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    testIsolation: false, // or 'strict' (default)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
