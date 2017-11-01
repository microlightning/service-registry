'use strict';

const assert = require('assert');
const _ = require('underscore');
const uuidv4 = require('uuid/v4');

const ServiceValidator = require('./service-validator');

var register = function (args) {
  var self = this;
  _.extend(self, args);

  assert(self.serviceRepository && self.eventHandler && self.errorHandler,
    'Missing argument(s) - one or many of the following arguments are missing: ' +
        'serviceRepository, eventHandler, errorHandler');

  self.serviceValidator = new ServiceValidator();

  self.getAllServices = self.serviceRepository.getAllServices;

  self.registerService = function (args) {
    return new Promise((resolve, reject) => {
      self.serviceValidator.validateService(args)
        .then(() => {
          args.service.id = uuidv4();
          args.service.last_heartbeat = new Date();
          self.serviceRepository.addService(args.service);
          resolve(args.service);
        })
        .catch((err) => {
          self.errorHandler.handleError(err);
          reject(err);
        });
    });
  };

  self.deregisterService = function (args) {
    return new Promise((resolve, reject) => {
      if (args && args.service && args.service.name && args.service.version) {
        self.serviceRepository.removeService(args.service.name, args.service.version)
          .then(resolve)
          .catch(reject);
      } else {
        reject(new Error('Service argument not provided or does not have a name and version'));
      }
    });
  };
};

module.exports = register;
