const assert = require('assert');
const express = require('express');

const Api = require('../../../src/api');

describe('Api requirements...', () => {
    it('must create the api', () => {

        var api = new Api({
            express: express
        })
    });
});