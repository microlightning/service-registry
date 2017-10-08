const assert = require('assert');
const ServiceRegistrator = require('../../../src/serviceRegistration/serviceRegistrator');
const ServiceValidator = require('../../../src/serviceRegistration/serviceValidator');

const Helpers = require('../../helpers');

var serviceRegistrator;

describe('Service registration requirements...', () => {
    beforeEach(() => {
        var args = {
            serviceValidator: new ServiceValidator(),
            serviceRepository: Helpers.mockedServiceRepository(),
            eventHandler: Helpers.mockedEventHandler(),
            errorHandler: Helpers.mockedErrorHandler()
        }

        serviceRegistrator = new ServiceRegistrator(args);
    });

    describe('When registering a service it should...', () => {
        beforeEach(() => {
            return serviceRegistrator.registerService({
                service: Helpers.newSerice()
            });
        });

        it('added a service to the list', () => {
            assert(serviceRegistrator.services.length === 1, "Number of services should equal 1, actually equals " + serviceRegistrator.services.length);
        });

        it.skip('have added a service to the repository', () => {

        });

        it.skip('have emitted an event', () => {

        });

        it.skip('have updated the heartbeat but not add the same service (name and version) again', () => {

        });

        it('have allowed for the next version of the service (with the same name)', () => {
            var args = {
                serviceValidator: new ServiceValidator(),
                serviceRepository: Helpers.mockedServiceRepository(),
                eventHandler: Helpers.mockedEventHandler(),
                errorHandler: Helpers.mockedErrorHandler(),
                services: [Helpers.newSerice()]
            }

            serviceRegistrator = new ServiceRegistrator(args);

            var newerService = Helpers.newSerice();
            newerService.version = 2;

            return serviceRegistrator.registerService({
                service: newerService
            }).then((service) => {
                assert(serviceRegistrator.services.length === 2, "Number of services should equal 2, actually equals " + serviceRegistrator.services.length);
            });
        });
    });

    describe('When registering an invalid service it should...', () => {
        it('fail gracefully', (done) => {
            serviceRegistrator.registerService()
                .catch((err) => {
                    assert(err);
                })
                .then(done, done);
        });
    })

    describe.skip('When deregistering a service it should...', () => {
        beforeEach(() => {
            return serviceRegistrator.registerService({
                    service: Helpers.newSerice()
                })
                .then((service) => {
                    serviceRegistrator.deregisterService({
                        service: service
                    })
                })
        });

        it.skip('have removed the service from the list', () => {
            //assert(serviceRegistrator.services.length === 0);
        });

        it.skip('have removed the service from the repository', () => {

        });

        it.skip('have emitted an event', () => {

        });

        it.skip('have not removed a different version of the service', () => {

        });
    });

});