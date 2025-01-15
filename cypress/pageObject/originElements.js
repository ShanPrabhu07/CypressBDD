class originElements{

    elements ={
 
     loginWithParatextBtn: ()=> cy.contains("Log in with paratext"),
 
    }
 
    loginWithParatextBtnClick(){
     this.elements.loginWithParatextBtn().click();
    }
 }
 
 export default originElements;