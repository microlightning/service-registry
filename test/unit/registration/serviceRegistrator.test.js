const assert = require('assert');
const ServiceRegistrator = require('../../../src/serviceRegistration/serviceRegistrator');
const ServiceValidator = require('../../../src/serviceRegistration/serviceValidator');

const Helpers = require('../../helpers');

var serviceRegistrator;

describe('Service registration requirements...', () => {
  beforeEach(() => {
    var args = {
      serviceValidator: new ServiceValidator(),
      serviceRepository: Helpers.mockedServiceRepository(),
      eventHandler: Helpers.mockedEventHandler(),
      errorHandler: Helpers.mockedErrorHandler()
    };

    serviceRegistrator = new ServiceRegistrator(args);
  });

  describe('When registering a service it should...', () => {
    beforeEach(() => {
      return serviceRegistrator.registerService({
        service: Helpers.newService()
      });
    });

    it('have added a service to the list', () => {
      assert(serviceRegistrator.services.length === 1, 'Number of services should equal 1, actually equals ' + serviceRegistrator.services.length);
    });

    it.skip('have added a service to the repository', () => {

    });

    it.skip('have emitted an event', () => {

    });

    it.skip('have updated the heartbeat but not add the same service (name and version) again', () => {

    });
  });

  describe('When registering an invalid service it should...', () => {
    it('fail gracefully', (done) => {
      serviceRegistrator.registerService()
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });
  });

  describe('When deregistering a service it should...', () => {
    beforeEach(() => {
      return serviceRegistrator.registerService({
        service: Helpers.newService()
      })
        .then((service) => {
          serviceRegistrator.deregisterService({
            service: service
          });
        });
    });

    it('have removed the service from the list', () => {
      assert(serviceRegistrator.services.length === 0, 'Number of services should equal 0, actually equals ' + serviceRegistrator.services.length);
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

  describe('When deregistering an invalid service it should...', () => {
    it('fail gracefully', (done) => {
      serviceRegistrator.deregisterService()
        .catch((err) => {
          assert(err);
        })
        .then(done, done);
    });
  });

  describe('When working with service versions it will...', () => {
    it('allow for the next version of the service (with the same name)', () => {
      var args = {
        serviceValidator: new ServiceValidator(),
        serviceRepository: Helpers.mockedServiceRepository(),
        eventHandler: Helpers.mockedEventHandler(),
        errorHandler: Helpers.mockedErrorHandler(),
        services: [Helpers.newService()]
      };

      serviceRegistrator = new ServiceRegistrator(args);

      var newerService = Helpers.newService();
      newerService.version = 2;

      return serviceRegistrator.registerService({
        service: newerService
      }).then((service) => {
        assert(serviceRegistrator.services.length === 2, 'Number of services should equal 2, actually equals ' + serviceRegistrator.services.length);
      });
    });

    it('not remove the wrong version of the service', () => {
      return serviceRegistrator.registerService({
        service: Helpers.newService()
      })
        .then((service) => {
          serviceRegistrator.deregisterService({
            service: {
              name: 'new-service',
              version: 2
            }
          }).then(() => {
            assert(serviceRegistrator.services.length === 1, 'Number of services should equal 1, actually equals ' + serviceRegistrator.services.length);
          });
        });
    });
  });
});
