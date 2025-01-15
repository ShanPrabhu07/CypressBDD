const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
  env:{
    url:"qa.scriptureforge.org"
  },
  e2e: {
    async setupNodeEvents(on, config) {
      // Add cucumber preprocessor plugin
      await addCucumberPreprocessorPlugin(on, config);

      // Use esbuild as the preprocessor
      on('file:preprocessor', createBundler({
        plugins: [createEsbuildPlugin(config)]
      }));

      return config;
    },
    specPattern: '**/*.feature',
    stepDefinitions: '**/*.{js,ts}',
    experimentalModifyObstructiveThirdPartyCode: true,
  },
});
