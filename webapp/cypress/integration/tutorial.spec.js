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
    cy.get('.next').should('be.visible', { timeout: 5000 });
    cy.get('.next').click();

    for (let i = 0; i < 11; i++) {
      cy.get('.introjs-nextbutton').should('be.visible', { timeout: 1000 });
      cy.get('.introjs-nextbutton').click();
      cy.get('.header').scrollIntoView();
    }

    cy.get('.introjs-donebutton').should('be.visible');
    cy.get('.introjs-donebutton').click();

    cy.get('.header').scrollIntoView();

    cy.get('.next').should('be.visible', { timeout: 3000 });
  });

  it('should follow guide instructions', () => {
    cy.get('.next').should('be.visible', { timeout: 5000 });
    cy.get('.next').click();

    // skip interface instruction
    cy.get('.introjs-skipbutton').click();

    cy.get('.next').should('be.visible', { timeout: 2000 });
    cy.get('.next').click();
    cy.get('.header').scrollIntoView();

    cy.get('.next').should('not.exist', { timeout: 2000 });
    cy.get('.header').scrollIntoView();
  });

  it('should not allow user to type code before reaching the correct step', () => {
    cy.get('.editor-0 .CodeMirror textarea', { timeout: 4000 }).type('var a = 1;', { force: true });
    cy.get('.editor-0.forbidden').should('be.visible', { timeout: 1000 });
  });

  it('should warn the user on invalid code', () => {
    cy.get('.next').should('be.visible', { timeout: 3000 });
    cy.get('.next').click();

    // skip interface instruction
    cy.get('.introjs-skipbutton').click({ timeout: 3000 });

    cy.get('.next').click({ timeout: 2000 });

    cy.contains('.type-wrap span > .text-white', '!', { timeout: 20000 });

    cy.get('.editor-0.forbidden').should('not.exist', { timeout: 2000 });
    cy.wait(1000);

    cy.get('.editor-0 .CodeMirror textarea').type('my code', { force: true });
    cy.wait(500);
    cy.get('.text-red').contains('Uncaught SyntaxError: Unexpected identifier');
  });
});