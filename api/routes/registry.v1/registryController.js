'use strict';

const assert = require('assert');
const _ = require('underscore');

var RegistryController = function (args) {
  var self = this;
  _.extend(self, args);
  assert(args.serviceRegistrator, 'Argument not foung: serviceRegistrator');

  this.getAllServices = (req, res, next) => {
    res.send(args.serviceRegistrator.services);
    next();
  };

  this.registerNewService = (req, res) => {
    var service = req.body;
    this.serviceRegistrator.registerService({service: service})
      .then((s) => {
        res.status(201).send(s);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  };
};

module.exports = RegistryController;
