'use strict';

const _ = require('underscore');
const serviceRegistration = require('../src');

var RegistryController = function (args) {
  var self = this;
  _.extend(self, args);

  self.serviceRegistrator = new serviceRegistration.ServiceRegistrator(args);

  self.getAllServices = (req, res, next) => {
    res.send(self.serviceRegistrator.services);
    next();
  };

  self.registerNewService = (req, res) => {
    var service = req.body;
    self.serviceRegistrator.registerService({service: service})
      .then((s) => {
        res.status(201).send(s);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
};

module.exports = RegistryController;
