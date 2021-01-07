const { decode } = require('jsonwebtoken');

describe('testing links', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  let authToken = null;
  let user = null;
  let linkId = null;

  before(() => {
    cy.apiSignin('luenarabii@gmail.com', 'password').then((token) => {
      authToken = token;
    });
  });

  it('should create a link', () => {
    const date = new Date('2021-01-02');
    user = decode(authToken);

    const data = {
      title: 'This is my first title for my next publishing content.',
      description:
        'Description will be used in the future, for the mean time let focus on somethng else.',
      date,
      owner: user._id,
    };

    cy.request({
      method: 'POST',
      url: '/links/create',
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      linkId = body.data._id;
    });
  });

  it('should update a link', () => {
    const data = {
      title: 'This is changed title',
      description: 'This is changing description.',
    };

    cy.request({
      method: 'PUT',
      url: `/links/${linkId}`,
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should retrieve a link.', () => {
    cy.request({
      method: 'get',
      url: `/links/${linkId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it("should retrieve all user's links", () => {
    cy.request({
      method: 'GET',
      url: '/links',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      qs: {
        owner: user._id,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should delete a link', () => {
    cy.request({
      method: 'DELETE',
      url: `/links/${linkId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should retrieve user waitings', () => {
    cy.request({
      method: 'GET',
      url: '/links/me/waitings',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should retrieve analytics', () => {
    cy.request({
      method: 'GET',
      url: `/links/${linkId}/analytics`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });
});
