'use strict';

const assert = require('assert');
const _ = require('underscore');

var register = function(args) {
    var self = this;
    _.extend(self, args);

    assert(self.serviceValidator && self.serviceRepository && self.eventHandler && self.errorHandler,
        "Missing argument(s): one or many of the following arguments are missing serviceValidator, serviceRepository, eventHandler, errorHandler");

    if (args.services) {
        self.services = args.services;
    } else {
        self.services = [];
    }

    // this.eventHandler.on("service-registry.service.registered", (service) => {
    //     // store in local memory

    // });

    // this.eventHandler.on("service-registry.service.deregistered", (service) => {
    //     // remove from local memory

    // })


    self.registerService = function(args) {
        return new Promise((resolve, reject) => {
            self.serviceValidator.validateService(args)
                .then(() => {
                    self.services.push(args.service);

                    // this.eventHandler.emitToSiblings("service.registered", args.service);

                    resolve(args.service);
                })
                .catch((err) => {
                    self.errorHandler.handleError(err);
                    reject(err);
                })
        });
    }

    // self.deregisterService = function(args) {
    //     return new Promise((resolve, reject) => {
    //         self.serviceValidator.validateService(args.service)
    //             .then(() => {
    //                 // remove from local memory

    //                 // emit event
    //                 // this.eventHandler.emitToSiblings("service.deregistered", args.service);

    //                 resolve();
    //             })
    //             .catch((err) => {
    //                 self.errorHandler.handleError(err);
    //                 reject(err);
    //             })
    //     });
    // }
}

module.exports = register;