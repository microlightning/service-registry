'use strict';

const express = require('express');
const ServicesController = require('./servicesController');

var Router = function (args) {
  var router = express.Router();
  var servicesController = new ServicesController(args);

  router.get('/:service_name/(*)', servicesController.proxyGet);
  router.put('/:service_name/(*)', servicesController.proxyPut);
  router.post('/:service_name/(*)', servicesController.proxyPost);
  router.delete('/:service_name/(*)', servicesController.proxyDelete);

  return router;
};

module.exports = Router;
