'use strict';

const express = require('express');

const appInitializer = require('./express.initializer');
const requestLifecycle = require('./request-lifecycle/');

var app = function (args) {
  let app = express();

  app.use(requestLifecycle.beginRequest);

  appInitializer({
    app: app,
    options: args
  });

  app.use(requestLifecycle.endRequest);

  return app;
};

module.exports = app;
