/// <reference types="cypress" />
let Chance = require('chance');
let chance = new Chance();
context('Cadastro', () => {
    it('Cadastro de usuario no site', () => {

        //rotas
        //GET /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
        //POST /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X

    cy.server()
    cy.route('POST','**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewTable');
    cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**' ).as('postUserTable');
    cy.route('GET','**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewTable');

       cy.visit('Register.html');
       cy.get('input[placeholder="First Name"]').type(chance.first());
       cy.get('input[ng-model^=Last]').type(chance.last());
       cy.get('input[ng-model^=Email]').type(chance.email());
       cy.get('input[ng-model^=Phone]').type(chance.phone({formatted: false}));
       cy.get('input[value=Male]').check();
       cy.get('input[type=checkbox]').check("Cricket");
       cy.get('input[type=checkbox]').check("Hockey");
       cy.get('select#Skills').select('APIs');
       cy.get('select#countries').select('Brazil');
       cy.get('select#country').select('Australia',{force: true});
       cy.get('select#yearbox').select('1975');
       cy.get('select[ng-model^=month]').select('September');
       cy.get('select#daybox').select('1');
       cy.get('input#firstpassword').type('Ab@2021');
       cy.get('input#secondpassword').type('Ab@2021');
       cy.get('input#imagesrc').attachFile('Capturar.PNG');
       cy.get('button#submitbtn').click();

       cy.wait('@postNewTable').then((resNewtable)=>{
           expect(resNewtable.status).to.eq(200)
           cy.log(resNewtable.status)
       })
       cy.wait('@postUserTable').then((resUserTable)=>{
           expect(resUserTable.status).to.eq(200)
       })
       cy.wait('@getNewTable').then((resNewTable)=>{
           expect(resNewTable.status).to.eq(200)
       })

       cy.url().should('contain','WebTable')
    });
});



