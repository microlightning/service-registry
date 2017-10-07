'use strict';

const _ = require('underscore');
const assert = require('assert');
const validateService = require('validation');

var Registration = function(args) {
    _.extend(this.args);

    assert(this.repository);
    assert(this.eventEmitter);

    this.registerService = function(args) {
        return new Promise((resolve, reject) => {
            validateService(args.service)
                .then(() => {

                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}

module.exports = Registration;