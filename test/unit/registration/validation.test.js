const assert = require('assert');
const serviceValidation = require('../../../src/registration/validation');

describe('Service validation requirements...', () => {

    describe('Validation must pass if...', () => {
        it('Everything is provided', (done) => {
            var service = {
                name: "service-name",
                version: 1,
                location: "http://service-name"
            }

            var args = {
                service: service
            }

            serviceValidation(args)
                .then((service) => {
                    assert(service);
                })
                .then(done, done);
        });
    });

    describe('Validation must fail if...', () => {

        it('no arguments are provided', (done) => {
            serviceValidation()
                .catch((err) => {
                    assert(err.errors);
                })
                .then(done, done);
        });

        it('no service argument is provided', (done) => {
            let args = {};
            serviceValidation(args)
                .catch((err) => {
                    assert(err.errors);
                })
                .then(done, done);
        });

        it('no name is provided', (done) => {
            var service = {
                version: 1,
                location: "http://service-name"
            }

            var args = {
                service: service
            }

            serviceValidation(args)
                .catch((err) => {
                    assert(err.errors);
                })
                .then(done, done);

        });

        it('no version is provided', (done) => {
            var service = {
                name: "service-name",
                location: "http://service-name"
            }

            var args = {
                service: service
            }

            serviceValidation(args)
                .catch((err) => {
                    assert(err.errors);
                })
                .then(done, done);

        });

        it('a version is provided as a string not an integer', (done) => {
            var service = {
                name: "service-name",
                version: "1",
                location: "http://service-name"
            }

            var args = {
                service: service
            }

            serviceValidation(args)
                .catch((err) => {
                    assert(err.errors);
                })
                .then(done, done);

        });


        it('a version is provided as a negative integer', (done) => {
            var service = {
                name: "service-name",
                version: -1,
                location: "http://service-name"
            }

            var args = {
                service: service
            }

            serviceValidation(args)
                .catch((err) => {
                    assert(err.errors);
                })
                .then(done, done);

        });

        it('no version is provided', (done) => {
            var service = {
                name: "service-name",
                location: "http://service-name"
            }

            var args = {
                service: service
            }

            serviceValidation(args)
                .catch((err) => {
                    assert(err.errors);
                })
                .then(done, done);

        });

        it('no location is not provided', (done) => {
            var service = {
                name: "service-name",
                version: 1,
            }

            var args = {
                service: service
            }

            serviceValidation(args)
                .catch((err) => {
                    assert(err.errors);
                })
                .then(done, done);
        });
    });
});