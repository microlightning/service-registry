'use strict';

const _ = require('underscore');

var errorHandler = (args) => {
  var self = this;
  _.extend(self, args);

  self.loggingLevel || (self.loggingLevel = 'VERBOSE');

  self.handleError = (args) => {
    if (self.loggingLevel === 'VERBOSE' || self.loggingLevel === 'ERROR') {
      let err = {
        timestamp: new Date(),
        error: args.err || 'No error detail provided'
      };
      console.log(err);
    }
  };
};

module.exports = errorHandler;
