'use strict';

const express = require('express');
const RegistryController = require('./registryController');

var Router = function(args) {
    this.router = express.Router();
    var registryController = new RegistryController(args);

    this.router.get('/services', registryController.getAllServices);
    this.router.post('/services', registryController.registerNewService);
}

module.exports = Router;