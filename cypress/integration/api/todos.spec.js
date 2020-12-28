describe('testing todos', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  let authToken = null;
  const workspaceId = '5fcf67d4c034d1ebf15e59d0';
  let calendarUnique = null;
  let calendarId = null;
  let todoId = null;

  before(() => {
    cy.apiSignin('luenarabii@gmail.com', 'password').then((token) => {
      authToken = token;
    });
  });

  it('should create a todo', () => {
    const date = new Date('2020-12-13');
    const timestamp = new Date(
      `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() + 1}`
    ).getTime();

    const data = {
      text: 'Writting my first todo item here',
      date: timestamp,
      description:
        'Description will be used in the future, for the mean time let focus on somethng else.',
      workspace: workspaceId,
      isChild: false,
      previous: todoId,
      next: null,
    };

    cy.request({
      method: 'POST',
      url: '/todos/create',
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      todoId = body.data._id;
      calendarUnique = body.data.calendar.unique;
      calendarId = body.data.calendar._id;
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
