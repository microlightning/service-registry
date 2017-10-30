'use strict';

var RegistryController = function (args) {
  this.getAllServices = (req, res, next) => {
    res.send(args.serviceRegistrator.services);
    next();
  };

  this.registerNewService = (req, res) => {

  };
};

module.exports = RegistryController;
