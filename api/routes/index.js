'use strict';

const _ = require('underscore');
const assert = require('assert');
const RegistryV1 = require('./registry.v1');
const Services = require('./services');

var routes = function (args) {
  var self = this;
  _.extend(self, args);

  assert(self.serviceRegistrator && self.proxy,
    'Missing argument(s): one or many of the following arguments are missing serviceRegistrator, proxy');

  self.registerRoutes = function (app) {
    var registryV1 = RegistryV1({serviceRegistrator: self.serviceRegistrator});
    var services = Services({proxy: self.proxy});
    app.use('/services', services);
    app.use('/registry/v1', registryV1);
  };
};

module.exports = routes;
