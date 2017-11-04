const uuidv4 = require('uuid/v4');

module.exports = function (req, res, next) {
  // trace handling
  if (!req.headers['x-jetstream-trace-id']) {
    res.status(400).send({
      error: "'x-jetstream-trace-id' header not provided"
    });
  } else if (!req.headers['x-jetstream-source']) {
    res.status(400).send({
      error: "'x-jetstream-source' header not provided"
    });
  } else {
    req.headers['x-jetstream-request-id'] = uuidv4();
    req.headers['x-jetstream-parent-trace-id'] = req.headers['x-jetstream-trace-id'];

    res.set('x-jetstream-trace-id', req.headers['x-jetstream-trace-id']);
    res.set('x-jetstream-source', req.headers['x-jetstream-source']);
    res.set('x-jetstream-request-id', req.headers['x-jetstream-request-id']);

    req.headers['x-jetstream-trace-id'] = uuidv4();
    next();
  }
};
