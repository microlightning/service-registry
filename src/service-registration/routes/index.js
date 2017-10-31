'use strict';

const express = require('express');
const RegistryController = require('./service-registration.controller');

var router = function (args) {
  var router = express.Router();
  var registryController = new RegistryController(args);

  router.get('/services', registryController.getAllServices);
  router.post('/services', registryController.registerNewService);

  return router;
};

module.exports = router;
