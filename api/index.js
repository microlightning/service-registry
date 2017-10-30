'use strict';

const express = require('express');

const appInitializer = require('./init');
const Routes = require('./routes');
const requestLifecycle = require('./requestLifecycle/');

var Api = function (args) {
  this.app = express();

  this.app.use(requestLifecycle.beginRequest);

  appInitializer({
    app: this.app,
    options: args.options
  });

  var routes = new Routes(args);
  routes.registerRoutes(this.app);

  this.app.use(requestLifecycle.endRequest);
};

module.exports = Api;
