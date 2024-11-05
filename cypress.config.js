const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1,
    defaultCommandTimeout: 50000,
    requestTimeout: 50000,
    responseTimeout: 50000,
    testIsolation: false, // or 'strict' (default)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
