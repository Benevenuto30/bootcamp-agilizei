//steps comuns a mais de uma feature

Given(/^que acesso o site$/, () => {
    //rotas
    //GET /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    //POST /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    //POST /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    cy.server()
    cy.route('POST','**/api/1/databases/userdetails/collections/newtable?**' ).as('postNewTable');
    cy.route('POST','**/api/1/databases/userdetails/collections/usertable?**' ).as('postUserTable');
    cy.route('GET','**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewTable');
    cy.visit('Register.html');
    });
    