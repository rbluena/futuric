describe('testing authentication', () => {
  Cypress.config('baseUrl', Cypress.env('API'));
  let registeredEmail = null;

  it('should register user with local data', () => {
    const data = {
      username: 'rbluena',
      email: 'rbluena@gmail.com',
      password: 'password',
      type: 'local',
    };

    cy.request({
      method: 'POST',
      url: '/auth/register',
      body: data,
    }).then((response) => {
      const { status, body } = response;

      registeredEmail = data.email;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');
    });
  });

  it('should verify user with verfication token', () => {
    const token =
      '8dbd7f92127294fab54e8e5502f6cce59335a8850cc2f6b570c7112b7826a33a';

    cy.request({
      method: 'GET',
      url: '/auth/verify',
      qs: {
        token,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should delete testing user', () => {
    cy.request({
      method: 'DELETE',
      url: '/auth/delete-test',
      qs: {
        email: registeredEmail,
      },
    }).then((response) => {
      const { status } = response;
      expect(status).to.equal(200);
    });
  });
});
