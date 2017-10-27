'use strict';

const _ = require('underscore');
const assert = require('assert');
const RegistryV1 = require('./registry.v1');
const Services = require('./services');

var routes = function(args) {
    var self = this;
    _.extend(self, args);

    assert(self.serviceRegistrator && self.proxy && self.app, "Missing argument(s): one or many of the following arguments are missing serviceRegistrator, proxy, app");

    var registryV1 = new RegistryV1({ serviceRegistrator: self.serviceRegistrator });
    self.app.use('/registry/v1', registryV1.router);

    var services = new Services({ proxy: self.proxy });
    self.app.use('/services', services.router);
}

module.exports = routes;