const URL = Cypress.env('host');
const email = Cypress.env('email');
const password = Cypress.env('password');

context('login', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    cy.visit(URL);

    cy.wait(1000);
    cy.get('[data-testid=languages]').select('en');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  it('should show up login options', () => {
    cy.contains('Sign in with Google').should('be.visible');
    cy.contains('Sign in with Facebook').should('be.visible');
    cy.contains('Sign in with Twitter').should('be.visible');
    cy.contains('Sign in with email').should('be.visible');

    cy.get('.user-progress').should('not.exist');
    cy.get('.user-info').should('not.exist');
  });

  it('should login with email', () => {
    cy.contains('Sign in with email').click();
    cy.get('input[type="email"').type(email);
    cy.contains('Next').click();
    cy.get('input[type="password"]').type(password);
    cy.contains('Sign In').click({ timeout: 10000 });
    cy.get('.profile').should('be.visible');
  });

  it('should logout with email', () => {
    cy.contains('Sign in with email').click();
    cy.get('input[type="email"').type(email);
    cy.contains('Next').click();
    cy.get('input[type="password"]').type(password);
    cy.contains('Sign In').click({ timeout: 10000 });
    cy.get('.picture-holder img').click();
    cy.contains('logout').click();
  });
});
