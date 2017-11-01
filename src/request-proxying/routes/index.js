'use strict';

const express = require('express');
const RequestProxyController = require('./request-proxying-controller');

var Router = function (args) {
  var router = express.Router();
  var servicesController = new RequestProxyController(args);

  router.get('/:service_name/v:service_version/(*)', servicesController.proxy);
  router.put('/:service_name/v:service_version/(*)', servicesController.proxy);
  router.post('/:service_name/v:service_version/(*)', servicesController.proxy);
  router.delete('/:service_name/v:service_version/(*)', servicesController.proxy);

  return router;
};

module.exports = Router;
