const assert = require('assert');
const ServiceRegistrator = require('../../../src/serviceRegistration/serviceRegistrator');
const ServiceValidator = require('../../../src/serviceRegistration/serviceValidator');

const Helpers = require('../../helpers');

var serviceRegistrator;

const Api = require('../../../api');

describe('Api requirements...', () => {
  beforeEach(() => {
    var args = {
      serviceValidator: new ServiceValidator(),
      serviceRepository: Helpers.mockedServiceRepository(),
      eventHandler: Helpers.mockedEventHandler(),
      errorHandler: Helpers.mockedErrorHandler()
    };

    serviceRegistrator = new ServiceRegistrator(args);
  });

  it('must create the api', () => {
    var api = new Api({
      serviceRegistrator: serviceRegistrator,
      proxy: {}
    });
  });
});
