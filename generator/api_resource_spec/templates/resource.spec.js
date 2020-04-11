const app = require('../../app');
const request = require('supertest');
const <%= schema.identifiers.singular.pascal %> = require('./<%= schema.identifiers.singular.snake %>.model')
const { JWT_HEADER } = require('../../../test/utils');
const { build<%= schema.identifiers.singular.pascal %> } = require('../../../test/mocks');

const API_ROOT = '/api/<%= schema.identifiers.plural.snake %>'

describe('<%= schema.identifiers.singular.label %> API', () => {

  <%- helpers.indent(include('./partials/spec-list.js'), 2) %>

  <%_ if (schema.identifiers.singular.snake !== 'user') { _%>
  <%- helpers.indent(include('./partials/spec-create.js'), 2) %>
  <%- helpers.indent(include('./partials/spec-update.js'), 2) %>
  <%_ } _%>

  <%- helpers.indent(include('./partials/spec-show.js'), 2) %>

  <%- helpers.indent(include('./partials/spec-destroy.js'), 2) %>

  <%- helpers.indent(include('./partials/spec-relation-actions.js'), 2) %>

  // // // //
  <%- helpers.indent(include('./partials/spec-reverse-relation-actions.js'), 2) %>
  // // // //

});
