const { decode } = require('jsonwebtoken');
const faker = require('faker');

describe('testing authentication', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  const user = {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    password: 'password',
    type: 'local',
  };

  // const verificationToken = null;
  let jwt = null;

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

  // it('should verify user with verification token', () => {
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

  it('should create new verification code', () => {
    cy.request({
      method: 'POST',
      url: '/auth/verify/new',
      body: { email: user.email },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should log user in with local data.', () => {
    cy.request({
      method: 'POST',
      url: '/auth/login',
      body: user,
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');

      ({ jwt } = body.data);
    });
  });

  it('should update user information.', () => {
    const decoded = decode(jwt);

    const userData = {
      email: faker.internet.email(),
      oldPassword: user.password,
      newPassword: 'newpassword',
    };

    cy.request({
      method: 'PUT',
      url: `/auth/update/${decoded._id}`,
      body: userData,
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
      expect(body.data.username).to.equal(userData.username);
    });
  });

  it('should delete testing user.', () => {
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

  // it('should follow and unfollow user', () => {
  //   cy.request({
  //     method: 'POST',
  //     url: '/auth/follow',
  //     body: {
  //       userId: '5ff17e3f85e2ce34c26eedeb',
  //     },
  //   });
  // });
});
