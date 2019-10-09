const URL = Cypress.env('host');

context('tutorial', () => {

  beforeEach(() => {
    cy.visit(URL);
    cy.wait(3000);
    cy.window().its('store').invoke('dispatch', {
      type: 'SET_USER',
      payload: {
        uid: '4444',
        name: 'aaa aaa ',
        email: 'aa@aa.com',
        photo: '',
        level: 2,
        tutorial: true,
        introduction: false,
        progress: 10,
      }
    });
  });

  afterEach(() => {
    cy.window().its('store').invoke('dispatch', {
      type: 'SET_USER',
      payload: {}
    });
  });

  it('should follow interface instructions', () => {
    cy.wait(5000);
    cy.get('.next').should('be.visible');
    cy.get('.next').click();

    for (let i = 0; i < 9; i++) {
      cy.wait(1000);
      cy.get('.introjs-nextbutton').should('be.visible');
      cy.get('.introjs-nextbutton').click();
    }

    cy.get('.introjs-donebutton').should('be.visible');
    cy.get('.introjs-donebutton').click();

    cy.wait(1000);

    cy.get('.next').should('be.visible');
  });

  it('should follow guide instructions', () => {
    cy.wait(5000);
    cy.get('.next').should('be.visible');
    cy.get('.next').click();

    // skip interface instruction
    cy.get('.introjs-skipbutton').click();

    cy.wait(2000);
    cy.get('.next').should('be.visible');
    cy.get('.next').click();

    cy.wait(2000);
    cy.get('.next').should('not.exist');
  });

  it('should not allow user to type code before reaching the correct step', () => {
    cy.wait(1000);
    cy.get('.editor-0 .CodeMirror textarea').type('var a = 1;', { force: true });
    cy.get('.editor-0.forbidden').should('be.visible');
  });

  it('should warn the user on invalid code', () => {
    cy.wait(5000);
    cy.get('.next').click();
    // skip interface instruction
    cy.get('.introjs-skipbutton').click();
    cy.wait(2000);
    cy.get('.next').click();
    cy.wait(10000);
    cy.get('.editor-0 .CodeMirror textarea').type('my code', { force: true });
    cy.wait(1000);
    cy.get('.text-red').contains('Uncaught SyntaxError: Unexpected identifier');
  });
});