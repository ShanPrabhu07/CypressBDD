const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  
  env:{
    url:"qa.scriptureforge.org"
  },
  reporter: "cypress-mochawesome-reporter",
    reporterOptions: {
      reportDir: "cypress/reports",   // Directory for report files
      overwrite: false,              // Do not overwrite previous reports
      html: true,                    // Generate an HTML report
      json: true,                    // Generate a JSON report
      reportFilename: "Test report",
      embeddedScreenshots: true,
      inlineAssets: true // Report file naming pattern
    },
  e2e: {

    setupNodeEvents(on, config) {
      const bundler = createBundler({
        plugins: [createEsbuildPlugin(config)],
      });

      on('file:preprocessor', bundler);
      addCucumberPreprocessorPlugin(on, config);

      return config;
    },
    specPattern: '**/*.feature',
    stepDefinitions: '**/*.{js,ts}',
    experimentalModifyObstructiveThirdPartyCode: true,

    experimentalOriginDependencies : true,
    supportFile: false,

  },
});
