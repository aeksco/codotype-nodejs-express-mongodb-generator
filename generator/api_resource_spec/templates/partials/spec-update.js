describe('PUT /api/<%= schema.identifiers.plural.snake %>/:id', () => {

  // Stores <%= schema.identifier %>_instance in outer scope
  let <%= schema.identifier %>_instance

  // Creates <%= schema.identifiers.singular.pascal %> mock record before running tests
  before(() => {
    <%= schema.identifier %>_instance = new <%= schema.identifiers.singular.pascal %>(build<%= schema.identifiers.singular.pascal %>())
    return <%= schema.identifier %>_instance.save()
  });

  // Destroys <%= schema.identifiers.singular.pascal %> mock record after running tests
  after(() => { return <%= schema.identifiers.singular.pascal %>.deleteOne(<%= schema.identifier %>_instance) });

  it('should respond with JSON object', (done) => {
    request(app)
    .put(`${API_ROOT}/${<%= schema.identifier %>_instance._id}`)
    .send(<%= schema.identifier %>_instance)
    .set('authorization', JWT_HEADER)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.instanceof(Object);
      done();
    });
  });
});
