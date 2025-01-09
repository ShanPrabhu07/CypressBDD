import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given('Open the browser and navigate to qa.scriptureforge.org', () => {
  cy.visit('qa.scriptureforge.org');
});

When('Click the "Login" button', () => {
  cy.contains("Log In").click()
});


Then('Click on the "Login with Paratext" on the login page', () => {


  cy.origin("https://dev-sillsdev.auth0.com", () => {
    cy.contains("Log in with paratext").click()
  });

});

When('Enter the Paratext admin credentials and click "Login"', () => {

  cy.origin("https://registry.paratext.org", () => {
    cy.get("#email").clear()
    cy.get("#email").type("shanmuga.k@ecgroup-intl.com")
    cy.get('button[type="submit"]').first().click()

  })

  cy.origin("https://accounts.google.com", () => {

    cy.wait(2000)
    cy.get("span").contains("Next").click()

    const stub = cy.stub()
    Cypress.on('uncaught:exception', (err, runnable) => {
      if (err.message.includes('ResizeObserver')) {
        stub()
        return false
      }
    })

    cy.get('[name="Passwd"]').type("Shan@123")

    cy.wrap(stub).should('have.been.called')

    cy.get("span").contains("Next").click()

  })

})

  Then('Verify that the admin user is logged in successfully', () => {

    cy.wait(5000)
    cy.url().should('eq', 'https://qa.scriptureforge.org/projects');

  })

When ('Verify that the user lands on the "My Projects" page upon successful login',()=>{

  cy.get("h1").should('have.text','My projects')

})

Then ('Click "Connect" on the project "Project SIL"',()=>{

  cy.contains("DAA").closest("mat-card").click()
})

When ('Verify that the project is connected successfully',()=>{

 cy.get(".project-name").should('have.text','DecQA')

})

Then ('Click on Settings page',()=>{

  cy.contains("settings").click()
  cy.wait(4000)
})

When ('Check the Translation Suggestions check box',()=>{

  cy.get(".mat-mdc-form-field").should('be.visible')

  cy.get('.checkbox-translation-suggestions').check()
})

Then ('Verify that the Translation suggestions enable for the project',()=>{

  cy.get('.checkbox-translation-suggestions').should('be.checked')
})

When ('Click on the Questions & Answers',()=>{

  cy.contains("question_answer").click()
})

Then ('Click on “Add Questions” button',()=>{

  cy.get(".add-question-button").click()
})

When ('Select the book “Ruth”, chapter 1, and 4th verse from the drop-down',()=>{

  cy.get("#mat-input-1").type("2KI 1:2")
})

Then('Add a text question (“Question 1”)',()=>{

  cy.get("#textarea").type("Question 1")
})

When('Click on the Save button',()=>{

  cy.contains("Save").click()
})

Then ('Add 2 more questions (“Question 2 and Question 3”) on the same book, same chapter and same verse (i.e. RUT 1:4)',()=>{

  for( let i = 1;i<=2;i++){
    cy.get(".add-question-button").click()
    cy.get("#mat-input-1").type("2KI 1:2")
    cy.get("#textarea").type("Question"+i+1)
    cy.contains("Save").click()
  }

})