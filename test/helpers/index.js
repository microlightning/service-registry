var MockedServiceRepository = require('./dependencies/mockedServiceRepository');
var MockedEventHandler = require('./dependencies/mockedEventHandler');
var MockedErrorHandler = require('./dependencies/mockedErrorHandler');

exports.newService = require('./services/newService');

exports.mockedEventHandler = function () {
  return new MockedEventHandler();
};

exports.mockedServiceRepository = function () {
  return new MockedServiceRepository();
};

exports.mockedErrorHandler = function () {
  return new MockedErrorHandler();
};
