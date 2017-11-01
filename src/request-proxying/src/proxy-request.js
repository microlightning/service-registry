'use strict';

const assert = require('assert');
const _ = require('underscore');
const request = require('request');

var Proxy = function (args) {
  var self = this;
  _.extend(self, args);

  assert(args.serviceRepository, 'Argument not provided: serviceRepository');

  self.makeRequest = function (args) {
    return new Promise((resolve, reject) => {
      self.serviceRepository.getServiceByNameAndVersion(args.service, args.version)
        .then((service) => {
          var url = service.location + args.url;

          var requestObject = {
            method: args.method,
            headers: args.headers,
            url: url
          };

          request(requestObject, (err, response) => {
            if (err) {
              reject(err);
            } else {
              resolve(response);
            }
          }).pipe(args.res);
        })
        .catch((err) => {
          console.log(err);
          args.res.status(500).send(err);
        });
    });
  };
};

module.exports = Proxy;
