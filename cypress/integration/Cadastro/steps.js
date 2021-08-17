/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();

Given(/^que acesso o site$/, () => {
//rotas
//GET /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
//POST /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
//POST /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
cy.server()
        cy.route({
          method: 'POST',
          url: '**/api/1/databases/userdetails/collections/newtable?**',
          status: 200,
          response: {}
        }).as('postNewtable');
        
        cy.route({
            method: 'POST', 
            url: '**/api/1/databases/userdetails/collections/usertable?**', 
            status: 200, 
            response: {}
          }).as('postUsertable');
        
        cy.route({
          method: 'GET',
          url: '**/api/1/databases/userdetails/collections/newtable?**',
          status: 200,
          response: {}
          }).as('getNewtable');
          
cy.visit('Register.html');
});

When(/^informar os meus dados$/, () => {
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
});

When(/^salvar$/, () => {
cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
  cy.wait('@postNewtable').then((resNewTable)=>{
    expect(resNewTable.response.status).to.eq(200)
})
cy.wait('@postUsertable').then((resNewTable)=>{
    expect(resNewTable.response.status).to.eq(200)
})
cy.wait('@getNewtable').then((resNewTable)=>{
    expect(resNewTable.response.status).to.eq(200)
})
cy.url().should('contain','WebTable')
});