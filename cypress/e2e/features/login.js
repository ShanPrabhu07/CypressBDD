import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Open the browser and navigate to qa.scriptureforge.org', () => {
  cy.visit('qa.scriptureforge.org');
});

When('Click the "Login" button', () => {
  cy.contains("Log In").click()
});


Then('Click on the "Login with Paratext" on the login page', () => {


  cy.origin("https://dev-sillsdev.auth0.com",()=>{
  cy.contains("Log in with paratext").click()
  });

});

When ('Enter the Paratext admin credentials and click "Login"' ,()=>{

  cy.origin("https://registry.paratext.org",()=>{
    cy.get("#email").clear()
    cy.get("#email").type("shanmuga.k@ecgroup-intl.com")
    cy.get('button[type="submit"]').first().click()

  })

  cy.origin("https://accounts.google.com",()=>{

    cy.wait(8000)
    cy.get("span").contains("Next").click()
    cy.get('input[type="password"]').type("Shan@123")

  })

  Then('Verify that the admin user is logged in successfully',()=>{


  })
});
