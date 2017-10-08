'use strict';

const _ = require('underscore');
const assert = require('assert');

var ServiceRepository = function(args) {
    var self = this;
    _.extend(self, args);

    self.services = [];

    self.getAllServices = function() {
        return new Promise((resolve, reject) => {
            resolve(self.services);
        });
    }

    self.addService = function(service) {
        return new Promise((resolve, reject) => {
            self.services.push(service);
            resolve(service);
        });
    }

}

module.exports = ServiceRepository;