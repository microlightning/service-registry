const assert = require('assert');
const ServiceRegistrator = require('../src/service-registrator');

const helpers = require('../../../test/helpers');

var serviceRegistrator;

describe('Service registration requirements...', () => {
  beforeEach(() => {
    var args = {
      serviceRepository: new helpers.mocks.repositories.ServiceRepository(),
      eventHandler: new helpers.mocks.tools.EventHandler(),
      errorHandler: new helpers.mocks.tools.ErrorHandler()
    };

    serviceRegistrator = new ServiceRegistrator(args);
  });

  describe('When registering a service it should...', () => {
    beforeEach(() => {
      return serviceRegistrator.registerService({
        service: helpers.examples.services.newService()
      });
    });

    it('have added a service to the list', (done) => {
      serviceRegistrator.getAllServices()
        .then((services) => {
          assert(services.length === 2,
            'Number of services should equal 2, actually equals ' + services.length);
        })
        .then(done, done);
    });

    it.skip('have added a service to the repository', () => {

    });

    it.skip('have emitted an event', () => {

    });

    it.skip('have updated the heartbeat but not add the same service (name and version) again', () => {

    });
  });

  describe('When registering an invalid service it should...', (done) => {
    it('fail gracefully', (done) => {
      serviceRegistrator.registerService()
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });
  });

  describe('When deregistering a service it should...', () => {
    beforeEach((done) => {
      serviceRegistrator.registerService({
        service: helpers.examples.services.newService()
      })
        .then((service) => {
          serviceRegistrator.deregisterService({
            service: service
          });
        })
        .then(done, done);
    });

    it('have removed the service from the list', (done) => {
      serviceRegistrator.getAllServices().then((services) => {
        assert(services.length === 1,
          'Number of services should equal 1, actually equals ' + services.length);
      })
        .then(done, done);
    });

    it.skip('have removed the service from the repository', () => {

    });

    it.skip('have emitted an event', () => {

    });

    it('allow you to try to remove a service which does not exist without failing', () => {
      return serviceRegistrator.deregisterService({
        service: {
          name: 'i-do-not-exist',
          version: 1
        }
      });
    });
  });

  describe('When deregistering an invalid service it should...', (done) => {
    it('fail gracefully', (done) => {
      serviceRegistrator.deregisterService()
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });
  });

  describe('When working with service versions it will...', () => {
    it('allow for the next version of the service (with the same name)', (done) => {
      var args = {
        serviceRepository: new helpers.mocks.repositories.ServiceRepository(),
        eventHandler: new helpers.mocks.tools.EventHandler(),
        errorHandler: new helpers.mocks.tools.ErrorHandler()
      };

      serviceRegistrator = new ServiceRegistrator(args);

      var newerService = helpers.examples.services.newService();
      newerService.name = 'my-test-service';
      newerService.version = 2;

      serviceRegistrator.registerService({service: newerService})
        .then(serviceRegistrator.getAllServices)
        .then((services) => {
          assert(services.length === 2,
            'Number of services should equal 2, actually equals ' + services.length);
        })
        .then(done, done);
    });

    it('not remove the wrong version of the service', (done) => {
      serviceRegistrator.registerService({
        service: helpers.examples.services.newService()
      })
        .then((service) => {
          serviceRegistrator.deregisterService({
            service: {
              name: 'new-service',
              version: 2
            }
          });
        })
        .then(serviceRegistrator.getAllServices)
        .then((services) => {
          assert(services.length === 2,
            'Number of services should equal 2, actually equals ' + services.length);
        })
        .then(done, done);
    });
  });
});
