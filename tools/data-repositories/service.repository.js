'use strict';

var ServiceRepository = function () {
  var self = this;

  self.services = [];

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

  self.removeService = function (name, version) {
    return new Promise((resolve, reject) => {
      var i = 0;
      var idx = -1;

      self.services.forEach((service) => {
        if (service.name === name && service.version === version) {
          idx = i;
        }
        i++;
      });

      if (idx >= 0) {
        self.services.splice(0, 1);
      }
      resolve(self.sevices);
    });
  };
};

module.exports = ServiceRepository;
