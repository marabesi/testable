const URL = Cypress.env('host');
const password = Cypress.env('password');

context('login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    cy.visit(URL);

    const email = `eita-${Math.random()}@test.com`;
    cy.contains('Sign in with email').click();
    cy.get('input[type="email"').type(email);
    cy.contains('Next').click();
    cy.get('input[name="name"]').type(email);
    cy.get('input[name="newPassword"]').type(password);
    cy.contains('Save').click();
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  it('should start with level 1', () => {
    cy.get('.title:first').should('have.text', 'level 1');
    cy.get('.progress-holder').should('have.attr', 'title', '10 %');
  });

  it('should follow the introduction flow', () => {
    for (let i = 0; i < 7; i ++) {
      cy.wait(5000);
      cy.get('.button').should('be.visible');
      cy.get('.button').click();
    }
  });
});
