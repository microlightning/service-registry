'use strict';

const _ = require('underscore');
const assert = require('assert');

var serviceRepository = (args) => {
    var self = this;
    _.extend(self, args);

    self.services = [];

    this.getAllServices = function() {
        return new Promise((resolve, reject) => {
            resolve(self.services);
        });
    }

}

module.exports = serviceRepository;