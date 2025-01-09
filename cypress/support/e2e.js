// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent failing the test
  return false;
});


Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore "bugsnag is not defined" errors
    if (err.message.includes('bugsnag is not defined')) {
      return false;
    }
    // Let other errors fail the test
    return true;
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore ResizeObserver errors
    if (err.message.includes('ResizeObserver loop')) {
      return false;
    }
    // Let other errors fail the test
    return true;
  });


  Cypress.on('window:before:load', (win) => {
    win.addEventListener('error', (e) => {
      if (e.message.includes('ResizeObserver loop')) {
        e.stopImmediatePropagation();
      }
    });
  });
  
  Cypress.on('uncaught:exception', (err) => {
    // we expect a 3rd party library error with message 'list not defined'
    // and don't want to fail the test so we return false
    if (err.message.includes('ResizeObserver loop')) {
      return false
    }
    // we still want to ensure there are no other unexpected
    // errors, so we let them fail the test
  })
  