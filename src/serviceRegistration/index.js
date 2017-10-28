'use strict';

const _ = require('underscore');
const assert = require('assert');
const ServiceValidator = require('./serviceValidator.js');
const ServiceRegistrator = require('./serviceRegistrator.js');

var Registration = function (args) {
  _.extend(this, args);

  assert(this.serviceRepository && this.eventHandler && this.errorHandler,
    'Missing argument(s): one or many of the following arguments are missing ' +
        'serviceRepository, eventHandler, errorHandler');

  this.serviceValidator = new ServiceValidator();

  this.serviceRegistrator = new ServiceRegistrator({
    serviceValidator: this.serviceValidator,
    serviceRepository: this.serviceRepository,
    eventHandler: this.eventHandler,
    errorHandler: this.errorHandler
  });

  this.registerService = this.serviceRegistrator.registerService;

  this.deregisterService = this.serviceRegistrator.deregisterService;
};

module.exports = Registration;
