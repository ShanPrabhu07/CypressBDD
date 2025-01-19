import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import loginElements from "../../pageObject/loginelements";

Cypress.on('uncaught:exception', (err, runnable) => {
  // Prevent failing the test
  return false;
});

after(() => {
  cy.wait(8000)
  cy.contains("settings").click({force:true})
  cy.get("#delete-btn").scrollIntoView()
  cy.get("#delete-btn").scrollIntoView().click({force:true})
  cy.get(".mat-mdc-input-element").type("DecQA")
  cy.get("#project-delete-btn").click()
});

Given('Open the browser and navigate to qa.scriptureforge.org', () => {
  //cy.visit('qa.scriptureforge.org');
  cy.visit(Cypress.env('url'));
  
});

When('Click the "Login" button', () => {
  //cy.contains("Log In").click()
  const loginObj = new loginElements()
  loginObj.loginBtnClick()
});


Then('Click on the "Login with Paratext" on the login page', () => {


  cy.origin("https://dev-sillsdev.auth0.com", () => {

    // const originElements=Cypress.require("../../pageObject/originElements")
    // const originObj = new originElements();
    // originObj.loginWithParatextBtnClick()

    cy.contains("Log in with paratext").click()
   
  });

});

When('Enter the Paratext admin credentials and click "Login"', () => {

    cy.origin("https://registry.paratext.org", () => {

 
    cy.wait(5000)
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

  cy.contains("DAA").scrollIntoView()
  const parentElem=cy.contains("DAA").parents(".user-unconnected-project.ng-star-inserted").should('exist')
  const childElem = parentElem.find('.mdc-button--unelevated').should('exist')
  cy.log(childElem)
  childElem.click({force:true})
  cy.get(".title").should('have.text','Connect Paratext Project')
  cy.get('.mdc-button__label').click()
  cy.get('.sync-progress').should('be.visible')
  cy.wait(12000)
  cy.get('.sync-progress').should('not.be.visible')
})

When ('Verify that the project is connected successfully',()=>{
  
  cy.get(".project-name").should('be.visible')
 cy.get(".project-name").should('have.text','DecQA')

})

Then ('Click on Settings page',()=>{

  cy.wait(8000)
  cy.contains("settings").click({force:true})
  cy.wait(8000)
})

When ('Check the Translation Suggestions check box',()=>{

  cy.get(".mat-mdc-form-field").should('be.visible')

  const suggestionscheck = cy.get('#checkbox-translation-suggestions-input')

  if(suggestionscheck.should('be.checked')){
    console.log("already checked")

  }
  else{
    suggestionscheck.check()
  }
})

Then ('Verify that the Translation suggestions enable for the project',()=>{

  cy.get('#checkbox-translation-suggestions-input').should('be.checked')
})

When ('Click on the Questions & Answers',()=>{

  cy.contains("question_answer").click()
})

Then ('Click on “Add Questions” button',()=>{

  cy.get(".add-question-button").eq(0).click()
})

When ('Select the book “Ruth”, chapter 1, and 4th verse from the drop-down',()=>{

  cy.get("#mat-input-1").clear()
  cy.get("#mat-input-1").type("2KI 1:4")
})

Then('Add a text question Question 1',()=>{

  cy.get("#textarea").type("Question 1")
})

When('Click on the Save button',()=>{

  cy.contains("Save").click()
})

Then ('Add two more questions on the same book, same chapter and same verse',()=>{

  for( let i = 1;i<=2;i++){
    cy.get(".add-question-button").eq(0).click()
    cy.wait(2000)
    cy.get('.mat-mdc-input-element').first().clear()
    cy.get('.mat-mdc-input-element').first().type("2KI 1:4")
    cy.get("#textarea").type("Question "+(i+1))
    cy.contains("Save").click()
  }

})

When('Verify that the 3 sets of questions are sorted in the canonical order',()=>{

  cy.get(".mat-mdc-list").children("mat-list-item").should("have.length",3).
  eq(0).should("have.text","Question 12 Kings 1:4")
  cy.get(".mat-mdc-list").children("mat-list-item").should("have.length",3).
  eq(1).should("have.text","Question 22 Kings 1:4")
  cy.get(".mat-mdc-list").children("mat-list-item").should("have.length",3).
  eq(2).should("have.text","Question 32 Kings 1:4")
})

Then('Click on the Add Questions button again',()=>{

  cy.get(".add-question-button").eq(0).click()
})

When('Verify that the Add questions dialog appears',()=>{

  cy.get(".mat-mdc-dialog-title").find("mat-icon").should('have.text','live_help')
})

Then('Add a Question 4 on the 5th verse of the book Ruth',()=>{

  cy.get(".mat-mdc-input-element").eq(0).should('be.visible') 
  cy.wait(3000)
  cy.get(".mat-mdc-input-element").eq(0).clear({force:true})
  cy.get(".mat-mdc-input-element").eq(0).type("2KI 1:5")
  cy.get("#textarea").type("Question 5")
  cy.contains("Save").click()
})

When('Verify that the added question appears below the previous questions in the canonical order',()=>{

  cy.get(".mat-mdc-list").children("mat-list-item").should("have.length",4).
  eq(3).should("have.text","Question 52 Kings 1:5")
})

Then('Click on the Add Questions button for final question',()=>{

  cy.get(".add-question-button").eq(0).click()

})

When('Add a text Question 5 on the 4th verse',()=>{

  cy.get(".mat-mdc-input-element").eq(0).should('be.visible') 
  cy.wait(3000)
  cy.get(".mat-mdc-input-element").eq(0).clear({force:true})
  cy.get(".mat-mdc-input-element").eq(0).type("2KI 1:4")
  cy.get("#textarea").type("Question 5")
  cy.contains("Save").click()

}) 

Then('Verify that the newly created question is added before the previously created question and appeared below the three questions on the same verse',()=>{
  var previous=cy.get(".mat-mdc-list").children("mat-list-item").eq(3)
  cy.get(".mat-mdc-list").children("mat-list-item").eq(4).prev(previous).should('exist')
})