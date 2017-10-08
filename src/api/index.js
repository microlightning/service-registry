// initialize the app and add the routes
// this singleton will require express to be injected so we can test

'use strict';

const _ = require('underscore');
const assert = require('assert');

const appInitializer = require('./appInitializer');

var Api = function(args) {
    var self = this;
    _.extend(self, args);

    assert(args.express);

    var app = args.express();

    appInitializer(app, args.options);

    app.use(routes);
}

module.exports = Api;