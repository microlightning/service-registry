const nock = require('nock');

module.exports = function () {
  nock('http://localhost:3333')
    .get('/endpoint')
    .reply(200, {
      id: 'abcdef',
      name: 'Hello!'
    });

  nock('http://newservice')
    .get('/test').reply(200, []).persist()
    .put('/test').reply(200, {}).persist()
    .post('/test').reply(201, {}).persist()
    .delete('/test').reply(204).persist();
};
