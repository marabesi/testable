const URL = Cypress.env('host');
const password = Cypress.env('password');

context('introduction page', () => {
  beforeEach(() => {
    cy.visit(URL);
    cy.wait(2000);

    cy.window().its('store').invoke('dispatch', {
      type: 'SET_USER',
      payload: {
        uid: '4444',
        name: 'aaa aaa ',
        email: 'aa@aa.com',
        photo: '',
        level: 1,
        tutorial: false,
        introduction: true,
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

  it('should start with level 1', () => {
    cy.get('.title:first').should('have.text', 'nível 1');
    cy.get('.progress-holder').should('have.attr', 'title', '10 %');
  });

  it('should follow the introduction flow', () => {
    for (let i = 0; i < 7; i ++) {
      cy.get('.button').should('be.visible', { timeout: 5000 });
      cy.get('.button').click();
      cy.get('.header').scrollIntoView();
    }
  });
});
