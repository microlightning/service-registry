'use strict';

const expressApp = require('./tools/express-app');

const repositories = require('./tools/data-repositories');
const ErrorHandler = require('./tools/error-handler');
const EventHandler = require('./tools/event-handler');

var args = {
  serviceRepository: new repositories.ServiceRepository(),
  eventHandler: new EventHandler(),
  errorHandler: new ErrorHandler()
};

var app = expressApp();

const serviceRegistration = require('./src/service-registration');
app.use('/registry/v1', serviceRegistration.routes(args));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
