const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const helpers = require('../../helpers/');

chai.use(chaiHttp);

var app;
var serviceId;
var newServiceId;

describe('End to end requirements...', () => {
  before(() => {
    helpers.mocks.useMockedExternalServices();
    app = require('../../../test/helpers/mocks/api-mocks');
  });

  after(() => {
    app.server.close();
  });

  describe('Full service lifecycle ', () => {
    it('it should be start with one service', (done) => {
      chai.request(app.api)
        .get('/v1/registry/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.length.should.equal(1);
          done();
        });
    });

    it('it should allow a service to register', (done) => {
      chai.request(app.api)
        .post('/v1/registry/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .send(helpers.examples.services.newService())
        .end((err, res) => {
          should.not.exist(err);
          serviceId = res.body.id;
          res.should.have.status(201);
          done();
        });
    });

    it('it should allow a get request to the new service', (done) => {
      // register a service
      chai.request(app.api)
        .get('/v1/services/new-service/v1/test')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });

    it('it should allow a put request to the new service', (done) => {
      // register a service
      chai.request(app.api)
        .put('/v1/services/new-service/v1/test')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });

    it('it should allow a post request to the new service', (done) => {
      // register a service
      chai.request(app.api)
        .post('/v1/services/new-service/v1/test')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(201);
          done();
        });
    });

    it('it should allow a delete request to the new service', (done) => {
      // register a service
      chai.request(app.api)
        .delete('/v1/services/new-service/v1/test')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(204);
          done();
        });
    });

    it('it should allow a service to re-register', (done) => {
      chai.request(app.api)
        .post('/v1/registry/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .send(helpers.examples.services.newService())
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });

    it('it should allow a service to register a new version', (done) => {
      var newService = helpers.examples.services.newService();
      newService.version = 2;
      chai.request(app.api)
        .post('/v1/registry/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .send(newService)
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(201);
          newServiceId = res.body.id;
          done();
        });
    });

    it('it should allow a get request to the new service', (done) => {
      // register a service
      chai.request(app.api)
        .get('/v1/services/new-service/v2/test')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          done();
        });
    });

    it('it should allow a service to deregister', (done) => {
      chai.request(app.api)
        .delete('/v1/registry/services/' + serviceId)
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(204);
          done();
        });
    });

    it('it should not allow a get request to the deregistered service', (done) => {
      chai.request(app.api)
        .get('/v1/services/new-service/v1/test')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(404);
          done();
        });
    });

    it('it should allow a service to deregister', (done) => {
      chai.request(app.api)
        .delete('/v1/registry/services/' + newServiceId)
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(204);
          done();
        });
    });

    it('it should not allow a get request to the deregistered service', (done) => {
      chai.request(app.api)
        .get('/v1/services/new-service/v2/test')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(404);
          done();
        });
    });

    it('it should be left with one service', (done) => {
      chai.request(app.api)
        .get('/v1/registry/services')
        .set('x-jetstream-trace-id', 'abcd')
        .set('x-jetstream-source', 'test')
        .end((err, res) => {
          should.not.exist(err);
          res.should.have.status(200);
          res.body.length.should.equal(1);
          done();
        });
    });
  });
});
