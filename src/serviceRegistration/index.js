'use strict';

const _ = require('underscore');
const assert = require('assert');
const ServiceValidator = require('./serviceValidator.js');
const ServiceRegistrator = require('./serviceRegistrator.js');

var Registration = function(args) {
    _.extend(this.args);

    assert(this.serviceRepository && this.eventHandler, "Missing arguments: serviceRepositry and/or eventHandler not provided");

    this.serviceValidator = new ServiceValidator();

    this.serviceRegistrator = new ServiceRegistrator({
        serviceValidator: this.serviceValidator,
        serviceRepository: this.serviceRepository,
        eventHandler: this.eventHandler
    });

    this.registerService = serviceRegistrator.registerService;

    this.deregisterService = serviceRegistrator.deregisterService;
}

module.exports = Registration;