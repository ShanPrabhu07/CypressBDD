class loginElements{

   elements ={

    loginBtn : ()=>  cy.contains("Log In"),


   }

   loginBtnClick(){
    this.elements.loginBtn().click();
   }


}

export default loginElements;