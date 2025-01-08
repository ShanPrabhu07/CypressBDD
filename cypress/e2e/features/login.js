import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('I open the login page', () => {
  cy.visit('https://qa.scriptureforge.org');
});

When('I enter valid username and password', () => {
  cy.contains("Log In").click()
});


Then('I should see the dashboard', () => {
  cy.log("success")
});
