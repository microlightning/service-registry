'use strict';

const _ = require('underscore');
const serviceRegistration = require('../src');

var RegistryController = function (args) {
  var self = this;
  _.extend(self, args);

  self.serviceRegistrator = new serviceRegistration.ServiceRegistrator(args);

  self.getAllServices = (req, res, next) => {
    self.serviceRegistrator.getAllServices()
      .then((services) => {
        res.send(services);
        next();
      })
      .catch((err) => {
        res.status(500).send(err);
        next();
      });
  };

  self.registerNewService = (req, res, next) => {
    var service = req.body;
    self.serviceRegistrator.registerService({service: service})
      .then((s) => {
        res.status(201).send(s);
        next();
      })
      .catch((err) => {
        res.status(400).send(err);
        next();
      });
  };
};

module.exports = RegistryController;
