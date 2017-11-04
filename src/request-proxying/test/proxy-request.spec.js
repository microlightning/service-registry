const assert = require('assert');
const Proxy = require('../src/request-proxy');
const helpers = require('../../../test/helpers');

describe('Proxy request requirements', () => {
  before(() => {
    helpers.mocks.useMockedExternalServices();
  });

  describe('When handling a valid request it should...', () => {
    it('Proxy the request to the correct destination', (done) => {
      var proxy = new Proxy({
        serviceRepository: new helpers.mocks.repositories.ServiceRepository()
      });

      var request = helpers.examples.proxyRequests.goodRequest();

      proxy.makeRequest(request).then((response) => {
        assert(response.statusCode === 200);
      }).catch((err) => {
        assert(!err);
      }).then(done, done);
    });
  });
});
