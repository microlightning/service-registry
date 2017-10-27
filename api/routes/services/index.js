'use strict';

const express = require('express');
const ServicesController = require('./servicesController');

var Router = function(args) {
    this.router = express.Router();
    var servicesController = new ServicesController(args);

    this.router.get('/:service_name/(*)', servicesController.proxyGet);
    this.router.put('/:service_name/(*)', servicesController.proxyPut);
    this.router.post('/:service_name/(*)', servicesController.proxyPost);
    this.router.delete('/:service_name/(*)', servicesController.proxyDelete);
}

module.exports = Router;