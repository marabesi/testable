const URL = Cypress.env('host');
const email = Cypress.env('email');
const password = Cypress.env('password');

context('login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    cy.visit(URL);
  });

  it('should login with email', () => {
    cy.contains('Sign in with email').click();
    cy.get('input[type="email"').type(email);
    cy.contains('Next').click();
    cy.get('input[type="password"]').type(password);
    cy.contains('Sign In').click();
    cy.wait(10000);
    cy.get('.profile').should('be.visible');
  });
});
