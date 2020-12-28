describe('testing authentication', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  it('should sign user up', () => {
    const data = {
      firstname: 'John',
      lastname: 'Doe',
      email: 'john_doe@gmail.com',
      password: 'password',
      type: 'local',
    };

    cy.request({
      method: 'POST',
      url: '/auth/register',
      body: data,
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');
    });
  });
});
