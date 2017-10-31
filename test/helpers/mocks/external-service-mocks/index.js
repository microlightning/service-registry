const nock = require('nock');

module.exports = function () {
  nock('http://localhost:3333')
    .get('/endpoint')
    .reply(200, {
      id: 'abcdef',
      name: 'Hello!'
    });
};
