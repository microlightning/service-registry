'use strict';

const ServiceRegistrator = require('./src/serviceRegistration/serviceRegistrator');
const ServiceValidator = require('./src/serviceRegistration/serviceValidator');
const ServiceRepository = require('./lib/serviceRepository');

const Helpers = require('./test/helpers');

var serviceRegistrator;

const Api = require('./api');

var serviceRepository = new ServiceRepository();

var args = {
  serviceValidator: new ServiceValidator(),
  serviceRepository: serviceRepository,
  eventHandler: Helpers.mockedEventHandler(),
  errorHandler: Helpers.mockedErrorHandler()
};

serviceRegistrator = new ServiceRegistrator(args);

var api = new Api({
  serviceRegistrator: serviceRegistrator,
  proxy: {}
});

api.app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
