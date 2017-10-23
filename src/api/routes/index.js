'use strict';

const assert = require('assert');
const _ = require('underscore');

var Routes = function(args) {
    var self = this;
    _.extend(self, args);

    assert(self.router, "Argument not provided: router");

    // lets add some routes

}

module.exports = Routes;



// /registry/v1/services

// GET - returns a list of all services

// POST - registers a new services


// /registry/v1/services/{service_name}

// GET - returns details about the service

// DELETE - deregisters a service


// /{service_name}/v{version_number}/*

// GET - forwarded request

// PUT - forwarded request

// POST - forwarded request

// DELETE - forwarded request


// /registry/v1/tools/propergate

// GET - refreshes the registry from the database