'use strict';

const _ = require('underscore');
const src = require('../src');

var RequestProxyController = function (args) {
  var self = this;
  _.extend(self, args);
  this.requestProxy = new src.ProxyRequest(args);

  this.proxy = (req, res) => {
    var request = {
      service: req.params.service_name,
      version: parseInt(req.params.service_version),
      headers: req.headers,
      method: req.method,
      url: `/${req.params[0]}`,
      res: res
    };

    this.requestProxy.makeRequest(request);
  };
};

module.exports = RequestProxyController;
