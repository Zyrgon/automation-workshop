const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'results/my-test-output-[hash].xml',
  },
  e2e: {
    baseUrl: 'https://www.tietoevry.com/cz/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
