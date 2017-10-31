module.exports = function () {
  return {
    service: 'my-test-service',
    method: 'GET',
    version: 1,
    headers: {},
    url: '/endpoint',
    res: {
      on: function () {},
      emit: function () {},
      end: function () {},
      removeListener: function () {}
    }
  };
};
