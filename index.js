const ServiceRegistrator = require('./src/serviceRegistration/serviceRegistrator');
const ServiceValidator = require('./src/serviceRegistration/serviceValidator');

const Helpers = require('./test/helpers');

var serviceRegistrator;

const Api = require('./api');

var args = {
    serviceValidator: new ServiceValidator(),
    serviceRepository: Helpers.mockedServiceRepository(),
    eventHandler: Helpers.mockedEventHandler(),
    errorHandler: Helpers.mockedErrorHandler()
}

serviceRegistrator = new ServiceRegistrator(args);

var api = new Api({
    serviceRegistrator: serviceRegistrator,
    proxy: {}
});

api.app.listen(3000, function() {
    console.log('Example app listening on port 3000!')
})