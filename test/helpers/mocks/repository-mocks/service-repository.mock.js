'use strict';

var ServiceRepository = function () {
  var self = this;

  self.services = [{
    name: 'my-test-service',
    version: 1,
    location: 'http://localhost:3333'
  }];

  self.getAllServices = function () {
    return new Promise((resolve, reject) => {
      resolve(self.services);
    });
  };

  self.addService = function (service) {
    return new Promise((resolve, reject) => {
      self.services.push(service);
      resolve(service);
    });
  };

  self.getServiceByName = function (serviceName) {
    return new Promise((resolve, reject) => {
      var s = self.services.filter((s) => {
        return s.name === serviceName;
      });
      if (s.length > 0) {
        resolve(s[0]);
      } else {
        reject(new Error('Service not found'));
      }
    });
  };

  self.getServiceByNameAndVersion = function (name, version) {
    return new Promise((resolve, reject) => {
      var s = self.services.filter((s) => {
        return (s.name === name && s.version === version);
      });
      if (s.length > 0) {
        resolve(s[0]);
      } else {
        reject(new Error('Service not found'));
      }
    });
  };
};

module.exports = ServiceRepository;
