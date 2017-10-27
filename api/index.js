'use strict';

const _ = require('underscore');
const assert = require('assert');
const express = require('express');

const appInitializer = require('./init');
const Routes = require('./routes');
const requestLifecycle = require('./requestLifecycle/');

var Api = function(args) {
    this.app = express();

    this.app.use(requestLifecycle.beginRequest);

    appInitializer({
        app: this.app,
        options: args.options
    });

    args.app = this.app;

    var routes = new Routes(args)

    this.app.use(requestLifecycle.endRequest);
}

module.exports = Api;