const assert = require('assert');

const appInitializer = require('../../../api/init');

const Helpers = require('../../helpers');

describe('App initializer requirements...', () => {
    it('It initializes with a valid express argument and no options', () => {
        const express = require('express');

        var app = express();

        appInitializer({
            app: app
        });
    });

    it('It initializes with a valid express argument and verbose logging', () => {
        const express = require('express');

        var app = express();

        appInitializer({
            app: app,
            options: {
                loggingLevel: 'VERBOSE'
            }
        });
    })
})