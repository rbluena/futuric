const { decode } = require('jsonwebtoken');

describe('testing links', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  let authToken = null;
  let user = null;

  before(() => {
    cy.apiSignin('rbluena@gmail.com', 'password').then((token) => {
      authToken = token;
    });
  });

  it.only('should create a link', () => {
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

      console.log(body);

      expect(status).to.equal(201);
      expect(body).to.have.property('data');
    });
  });

  it('should update a todo', () => {
    const data = {
      text: 'Update todo text',
      description: 'Updated description',
      previous: null,
    };

    cy.request({
      method: 'PUT',
      url: `/todos/${todoId}`,
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

  it.skip('should change todo position while dragging and droping', () => {
    const data = {
      oldPosition: '',
      newPosition: '',
      children: [],
    };

    cy.request({
      method: 'PUT',
      url: `/todos/${todoId}/position`,
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

  it('should delete a todo', () => {
    cy.request({
      method: 'DELETE',
      url: `/todos/${todoId}/${calendarId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it.skip('should retrieve all todos', () => {
    cy.request({
      method: 'get',
      url: `/todos`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      qs: {
        workspaceId,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');
    });
  });

  it('should retrieve all todo for a calendar', () => {
    cy.request({
      method: 'get',
      url: `/todos/calendar`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      qs: {
        workspace: workspaceId,
        calendarUnique,
        renderType: 'daily', // daily, monthly, quartely
        from: new Date('2020-12-01').toISOString(),
        to: new Date('2020-02-30').toISOString(),
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });
});
