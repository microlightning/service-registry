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
app.use('/registry/v1', serviceRegistration.routes(args));

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

module.exports = {
  api: app,
  server: server
};
