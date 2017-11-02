'use strict';

const expressApp = require('../../../../tools/express-app');

const repositories = require('../repository-mocks');
const tools = require('../tool-mocks');

var args = {
  serviceRepository: new repositories.ServiceRepository(),
  eventHandler: new tools.EventHandler(),
  errorHandler: new tools.ErrorHandler()
};

var app = expressApp();

const serviceRegistration = require('../../../../src/service-registration');
app.use('/v1/registry', serviceRegistration.routes(args));

const requestProxy = require('../../../../src/request-proxying');
app.use('/v1/services', requestProxy.routes(args));

var server = app.listen(3000);

module.exports = {
  api: app,
  server: server
};
