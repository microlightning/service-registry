'use strict';

var serviceValidator = function (args) {
  this.validateService = function (args) {
    return new Promise(function (resolve, reject) {
      if (!args || !args.service) {
        reject(new Error('Service argument not provided'));
      } else {
        let service = args.service;
        let errors = [];

        if (!service.name) {
          errors.push('Name not provided');
        }

        if (!service.version) {
          errors.push('Version not provided');
        } else if (typeof service.version != 'number') {
          errors.push('Version is not a number');
        } else if (service.version < 0) {
          errors.push('Version must be a positive number or zero');
        }

        if (!service.location) {
          errors.push('Location not provided');
        }

        if (errors.length > 0) {
          reject(new Error(errors));
        } else {
          resolve(args.service);
        }
      }
    });
  };
};

module.exports = serviceValidator;
