const assert = require('assert');
const Validation = require('../src/service-validator');
const helpers = require('../../../test/helpers');

var serviceValidator;

describe('Service validation requirements...', () => {
  before(() => {
    serviceValidator = new Validation();
  });

  describe('Validation must pass if...', () => {
    it('Everything is provided', (done) => {
      var args = {
        service: helpers.examples.services.newService()
      };

      serviceValidator.validateService(args)
        .then((service) => {
          assert(service);
        })
        .then(done, done);
    });
  });

  describe('Validation must fail if...', () => {
    it('no arguments are provided', (done) => {
      serviceValidator.validateService()
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });

    it('no service argument is provided', (done) => {
      let args = {};
      serviceValidator.validateService(args)
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });

    it('no name is provided', (done) => {
      var service = helpers.examples.services.newService();
      delete service.name;

      var args = {
        service: service
      };

      serviceValidator.validateService(args)
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });

    it('no version is provided', (done) => {
      var service = helpers.examples.services.newService();
      delete service.version;

      var args = {
        service: service
      };

      serviceValidator.validateService(args)
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });

    it('a version is provided as a string not an integer', (done) => {
      var service = helpers.examples.services.newService();
      service.version = '1';

      var args = {
        service: service
      };

      serviceValidator.validateService(args)
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });

    it('a version is provided as a negative integer', (done) => {
      var service = helpers.examples.services.newService();
      service.version = -1;

      var args = {
        service: service
      };

      serviceValidator.validateService(args)
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });

    it('no location is not provided', (done) => {
      var service = helpers.examples.services.newService();
      delete service.location;

      var args = {
        service: service
      };

      serviceValidator.validateService(args)
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });
  });
});
