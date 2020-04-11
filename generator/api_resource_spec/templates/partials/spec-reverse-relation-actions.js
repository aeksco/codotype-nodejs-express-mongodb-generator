<%_ schema.reverse_relations.forEach((rel) => { _%>
<%_ if ([RelationType.HAS_ONE].includes(rel.type)) { _%>
describe('GET /api/<%= schema.identifiers.plural.snake %>/:id/<%= rel.alias.identifier %>', () => {

  // Stores <%= schema.identifier %>_instance in outer scope
  let <%= schema.identifier %>_instance

  // Creates <%= schema.identifiers.singular.pascal %> mock record before running tests
  before(() => {
    <%= schema.identifier %>_instance = new <%= schema.identifiers.singular.pascal %>(build<%= schema.identifiers.singular.pascal %>())
    return <%= schema.identifier %>_instance.save()
  });

  // Destroys <%= schema.identifiers.singular.pascal %> mock record after running tests
  after(() => { return <%= schema.identifiers.singular.pascal %>.deleteOne(<%= schema.identifier %>_instance) });

  it('authenticated request should respond with JSON object', (done) => {
    request(app)
    .get(`${API_ROOT}/${<%= schema.identifier %>_instance._id}/<%= rel.alias.identifier %>`)
    .set('authorization', JWT_HEADER)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.instanceof(Object);
      done();
    });
  });
});

// // // //
<% } else if ([RelationType.BELONGS_TO].includes(rel.type)) { %>
// GET /api/<%= schema.identifiers.plural.snake %>/:id/<%= rel.schema.identifiers.plural.snake %> show<%= rel.schema.class_name_plural %>

describe('GET /api/<%= schema.identifiers.plural.snake %>/:id/<%= rel.alias.identifier_plural %>', () => {

  // Stores <%= schema.identifier %>_instance in outer scope
  let <%= schema.identifier %>_instance

  // Creates <%= schema.identifiers.singular.pascal %> mock record before running tests
  before(() => {
    <%= schema.identifier %>_instance = new <%= schema.identifiers.singular.pascal %>(build<%= schema.identifiers.singular.pascal %>())
    return <%= schema.identifier %>_instance.save()
  });

  // Destroys <%= schema.identifiers.singular.pascal %> mock record after running tests
  after(() => { return <%= schema.identifiers.singular.pascal %>.deleteOne(<%= schema.identifier %>_instance) });

  it('authenticated request should respond with JSON object', (done) => {
    request(app)
    .get(`${API_ROOT}/${<%= schema.identifier %>_instance._id}/<%= rel.alias.identifier_plural %>`)
    .set('authorization', JWT_HEADER)
    .expect(200)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.instanceof(Object);
      done();
    });
  });
});

// // // //

<%_ } _%>
<%_ }) _%>