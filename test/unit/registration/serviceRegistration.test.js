const assert = require('assert');

const ServiceRegistration = require('../../../src/serviceRegistration');

const Helpers = require('../../helpers');

describe('Service registration factory requirements...', () => {
  it('A service registration class can be created', () => {
    var args = {
      serviceRepository: Helpers.mockedServiceRepository(),
      eventHandler: Helpers.mockedEventHandler(),
      errorHandler: Helpers.mockedErrorHandler()
    };

    var serviceRegistration = new ServiceRegistration(args);
    assert(serviceRegistration);
  });
});
