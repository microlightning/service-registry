// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const exampleHelpers = require('../../helpers/examples/index');

chai.use(chaiHttp);

var app;

describe('Service registration API requirements...', () => {
  beforeEach(() => {
    app = require('../../helpers/mocks/api-mocks');
  });

  afterEach(() => {
    app.server.close();
  });

  describe('When registering a service it should...', () => {
    it('Accept a legitimate service', (done) => {
      chai.request(app.api)
        .post('/registry/v1/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .send(exampleHelpers.services.newService())
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(201);
          res.body.should.be.a('object');
          should.exist(res.body.id);
          should.exist(res.body.last_heartbeat);
          done();
        });
    });

    it('Reject a service with no name', (done) => {
      var service = exampleHelpers.services.newService();
      delete service.name;

      chai.request(app.api)
        .post('/registry/v1/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .send(service)
        .end((err, res) => {
          should.exist(err);
          res.should.have.status(400);
          done();
        });
    });

    it('Reject a service with no location', (done) => {
      var service = exampleHelpers.services.newService();
      delete service.location;

      chai.request(app.api)
        .post('/registry/v1/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .send(service)
        .end((err, res) => {
          should.exist(err);
          res.should.have.status(400);
          done();
        });
    });

    it('Reject a service with no version', (done) => {
      var service = exampleHelpers.services.newService();
      delete service.version;

      chai.request(app.api)
        .post('/registry/v1/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .send(service)
        .end((err, res) => {
          should.exist(err);
          res.should.have.status(400);
          done();
        });
    });

    it('Return a list of currently registered services with properties', (done) => {
      chai.request(app.api)
        .get('/registry/v1/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('When re-registering a service it should...', () => {
    it.skip('Update the heartbeat of the service', () => {

    });
  });

  describe('When de-registering a service it should...', () => {
    it.skip('De-register a service correctly', () => {

    });

    it.skip('Fail gracefully if de-registering a service which does not exist', () => {

    });
  });
});
