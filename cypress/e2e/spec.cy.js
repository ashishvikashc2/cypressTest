beforeEach(function() {
  cy.visit('https://google.com');
})

describe('Google Test pack',()=> {
  it('Search functionality with valid query',()=>{
    cy.get('#APjFqb').type('Cypress').type('{enter}');
    cy.get('#search').should('be.visible');
  })

  it('Search suggestions dropdown',()=>{
    cy.get('#APjFqb').type('Cypress');
    cy.get('li.sbct').should('be.visible');
  })

  it('Search with Special characters',()=>{
    cy.get('#APjFqb').type('#cyress$').type('{enter}');
    cy.get('#search').should('be.visible');
  })

  it('Autocomplete functionality',()=>{
    cy.get('#APjFqb').type('cypr', {delay:200});
    cy.get('li.sbct').should('be.visible');
    cy.get('ul[role="listbox"] li span').should('be.visible')
      .each(($el)=>{
      debugger
      let ele = $el.text().trim();
      if(ele ==='cypress'){
        cy.wrap($el).click({force : true});
      }
    })
    cy.get('h3').should('contain.text', 'cypress');
  })

  it("No match", ()=>{
    cy.get('#APjFqb').type("@#3323123sdfghjkl;trtyuiocvbnfghjkvbn@23123").type('{enter}');
    cy.contains('did not match any documents').should('be.visible');

  })

  it("Search instead of", ()=>{
    cy.get('#APjFqb').type("crikcet").type('{enter}');
    cy.contains('Search instead for').should('be.visible');
  })

})