'use strict';

var RegistryController = function (args) {
  this.getAllServices = (req, res) => {
    res.send(args.serviceRegistrator.services);
  };

  this.registerNewService = (req, res) => {

  };
};

module.exports = RegistryController;
