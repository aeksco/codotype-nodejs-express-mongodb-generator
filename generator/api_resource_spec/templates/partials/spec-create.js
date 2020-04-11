describe('POST /api/<%= schema.identifiers.plural.snake %>', () => {
  it('authenticated request should respond with JSON object', (done) => {
    request(app)
    .post(API_ROOT)
    .send(build<%= schema.identifiers.singular.pascal %>())
    .set('authorization', JWT_HEADER)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.instanceof(Object);
      done();
    });
  });

  it('unauthenticated request should respond with 403 forbidden', (done) => {
    request(app)
    .post(API_ROOT)
    .send(build<%= schema.identifiers.singular.pascal %>())
    .expect(401)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      if (err) return done(err);
      res.body.should.be.instanceof(Object);
      done();
    });
  });
});
