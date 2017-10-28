const assert = require('assert');
const Validation = require('../../../src/serviceRegistration/serviceValidator');

var serviceValidator;

describe('Service validation requirements...', () => {
  before(() => {
    serviceValidator = new Validation();
  });

  describe('Validation must pass if...', () => {
    it('Everything is provided', (done) => {
      var service = {
        name: 'service-name',
        version: 1,
        location: 'http://service-name'
      };

      var args = {
        service: service
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
      var service = {
        version: 1,
        location: 'http://service-name'
      };

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
      var service = {
        name: 'service-name',
        location: 'http://service-name'
      };

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
      var service = {
        name: 'service-name',
        version: '1',
        location: 'http://service-name'
      };

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
      var service = {
        name: 'service-name',
        version: -1,
        location: 'http://service-name'
      };

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
      var service = {
        name: 'service-name',
        location: 'http://service-name'
      };

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
      var service = {
        name: 'service-name',
        version: 1
      };

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
