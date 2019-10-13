const URL = Cypress.env('host');

const urls = [
  '/#/intro',
  '/#/tutorial',
  '/#/tutorial-end',
  '/#/unit-testing-intro',
  '/#/unit-testing',
  '/#/unit-testing-end',
  '/#/rocket-01',
  '/#/rocket-02',
  '/#/rocket-03',
  '/#/rocket-03-01',
  '/#/rocket-03-02',
  '/#/completed',
  '/#/survey',
];

context('routes', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    indexedDB.deleteDatabase('firebaseLocalStorageDb');

    cy.visit(URL);
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();

    indexedDB.deleteDatabase('firebaseLocalStorageDb');
  });

  describe('should not allow access via url without login', () => {
    urls.forEach(url => {
      it(`should not allow unauthorized access to ${url}`, () => {
        cy.visit(`${URL}${url}`);
        cy.get('#firebaseui-auth-container').should('be.visible');
      });
    });
  });
});
