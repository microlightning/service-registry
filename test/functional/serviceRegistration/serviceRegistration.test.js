// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

var app;

describe('Service registration API requirements...', () => {
  before(() => {
    app = require('../../helpers/api');
  });

  after(() => {
    app.server.close();
  });

  describe('When registering a service it should...', () => {
    it.skip('Accept a legitimate service', () => {

    });

    it.skip('Reject a service with no name', () => {

    });

    it.skip('Reject a service with no location', () => {

    });

    it.skip('Accept a service with no version and make it v1', () => {

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
          res.body.length.should.be.eql(0);
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
