'use strict';

const _ = require('underscore');
const assert = require('assert');

const appInitializer = require('./appInitializer');
const Routes = require('./routes');

var Api = function(args) {
    var self = this;
    _.extend(self, args);

    assert(args.express);

    var app = args.express();

    appInitializer({
        app: app,
        options: args.options
    });

    var router = new args.express.Router();

    var routes = new Routes({
        router: router
    });

    app.use(routes.router);
}

module.exports = Api;