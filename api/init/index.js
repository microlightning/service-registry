'use strict';

const assert = require('assert');
const bodyParser = require('body-parser');
const morgan = require('morgan');

var initialize = function(args) {
    assert(args);
    assert(args.app);

    args.options || (args.options = {});
    args.options.jsonLimit || (args.options.jsonLimit = '1mb');
    args.options.formDataLimit || (args.options.formDataLimit = '4mb');
    args.options.loggingLevel || (args.options.loggingLevel = 'Error');



    args.app.use(bodyParser.urlencoded({ extended: true }));
    args.app.use(bodyParser.json({ limit: args.options.jsonLimit }));
    args.app.use(bodyParser.raw({ type: 'multipart/form-data', limit: args.options.formDataLimit }));

    if (args.options.loggingLevel === 'VERBOSE') {
        args.app.use(morgan('dev'));
    }

    args.app.disable('etag');
}

module.exports = initialize;