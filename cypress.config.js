const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    testIsolation: false, // or 'strict' (default)
    setupNodeEvents(on, config) {
      // implement node event listeners here
    }
  }
})
