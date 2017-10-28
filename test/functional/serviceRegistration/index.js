describe.skip('Service registration API requirements...', () => {
  describe('When registering a service it should...', () => {
    it('Accept a legitimate service', () => {

    });

    it('Reject a service with no name', () => {

    });

    it('Reject a service with no location', () => {

    });

    it('Accept a service with no version and make it v1', () => {

    });
  });

  describe('When re-registering a service it should...', () => {
    it('Update the heartbeat of the service', () => {

    });
  });

  describe('When de-registering a service it should...', () => {
    it('De-register a service correctly', () => {

    });

    it('Fail gracefully if de-registering a service which does not exist', () => {

    });
  });
});
