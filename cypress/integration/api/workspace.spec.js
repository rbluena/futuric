/// <reference types="cypress" />

/**
 *  TODO:
 *
 * 1. Creat authRequest command
 * 2. Save some of the responses to the environment variables Cypress.env('key', 'value')
 * 3. Adding custom commands for opening AuthMenu, Dialog
 * 3. Adding tabs to switch between completed and uncompleted on the modal
 * 4: Checking how to test crossbrowser
 * 5. Setup new configurations
 * 6. Using aliases
 * 7. Using wait
 * 8. Running test with parallel CI with Circle CI
 * 9. Implementing test doubles, i.e spies, mocks and stubs  SINON.js
 * 10. State persistance, using client side authentication only
 * */

describe('testing workspaces', () => {
  Cypress.config('baseUrl', Cypress.env('API'));

  let authToken = null;
  let workspaceId = null;

  before(() => {
    cy.apiSignin('john_doe@gmail.com', 'password').then((token) => {
      authToken = token;
    });
  });

  it('should create a workspace', () => {
    const data = {
      name: 'Fake Workspace',
      color: '#cecece',
    };

    cy.request({
      method: 'POST',
      url: '/workspaces/create',
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(201);
      expect(body).to.have.property('data');

      workspaceId = body.data._id;
    });
  });

  it('should update a workspace', () => {
    const data = {
      name: 'Updated Workspace',
      color: '#FFFFFF',
    };

    cy.request({
      method: 'PUT',
      url: `/workspaces/${workspaceId}/`,
      body: data,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
      expect(body.data._id).to.equal(workspaceId);
    });
  });

  it('should delete a workspace', () => {
    cy.request({
      method: 'DELETE',
      url: `/workspaces/${workspaceId}`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
      expect(body.data._id).to.equal(workspaceId);
    });
  });

  it("should return all user's workspaces except archived and deleted", () => {
    cy.request({
      method: 'GET',
      url: '/workspaces',
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');
    });
  });

  it('should return archived workspaces', () => {
    cy.request({
      method: 'GET',
      url: '/workspaces',
      qs: {
        archived: true,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');

      const values = Object.values(body.data);
      if (values && values.length) {
        expect(values[0].archived).to.equal(true);
      }
    });
  });

  it('should return deleted workspaces', () => {
    cy.request({
      method: 'GET',
      url: '/workspaces',
      qs: {
        deleted: true,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }).then((response) => {
      const { status, body } = response;

      expect(status).to.equal(200);
      expect(body).to.have.property('data');

      const values = Object.values(body.data);
      if (values) {
        expect(values[0].deleted).to.equal(true);
      }
    });
  });

  it('should return all workspaces including deleted and archived', () => {
    cy.request({
      method: 'GET',
      url: '/workspaces',
      qs: {
        all: true,
      },
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
