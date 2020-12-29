const faker = require('faker');

describe('testing authentication', () => {
  Cypress.config('baseUrl', Cypress.env('API'));
  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'password',
    type: 'local',
  };
  const verificationToken = null;

  it('should register user with local data', () => {
    cy.request({
      method: 'POST',
      url: '/auth/register',
      body: user,
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');
    });
  });

  // it('should verify user with verfication token', () => {
  //   cy.request({
  //     method: 'GET',
  //     url: '/auth/verify',
  //     qs: {
  //       token: verificationToken,
  //     },
  //   }).then((response) => {
  //     const { status, body } = response;

  //     expect(status).to.equal(200);
  //     expect(body).to.have.property('data');
  //   });
  // });

  it('should log user in with local data', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      body: user,
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
        email: user.email,
      },
    }).then((response) => {
      const { status } = response;
      expect(status).to.equal(200);
    });
  });
});
