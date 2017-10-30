'use strict';

const uuidv4 = require('uuid/v4');

var requestLifeCycleEvents = {

  // fired at the very start of a request, before anything else
  beginRequest: function (req, res, next) {
    // trace handling
    if (!req.headers['x-jetstream-trace-id']) {
      res.status(400).send({
        error: "'x-jetstream-trace-id' header not provided"
      });
    } else if (!req.headers['x-jetstream-source']) {
      res.status(400).send({
        error: "'x-jetstream-source' header not provided"
      });
    } else {
      req.headers['x-jetstream-parent-trace-id'] =
                req.headers['x-jetstream-trace-id'];
      res.headers = {
        'x-jetstream-parent-trace-id': req.headers['x-jetstream-trace-id']
      };
      req.headers['x-jetstream-trace-id'] =
                uuidv4();
      next();
    }
  },

  // fired at the very end of a request, after anything else
  // including the result being sent
  endRequest: function (req, res, next) {
    res.end();
  }
};

module.exports = requestLifeCycleEvents;
