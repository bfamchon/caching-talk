const Fastify = require('fastify');
const path = require('path');

const fastify = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname,reqId,responseTime',
      },
    },
  },
  disableRequestLogging: true,
});

fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
});

fastify.addHook('onResponse', (request, reply, done) => {
  request.log.info(`${request.method} \x1b[38;5;1m${request.url} \x1b[38;5;226m${reply.statusCode}`);
  done();
});

fastify.register(require('./server/routes/max-age'), { prefix: '/max-age' });
fastify.register(require('./server/routes/etag'), { prefix: '/etag' });
fastify.register(require('./server/routes/last-modified'), { prefix: '/last-modified' });

// Run the server!
fastify.listen({ port: 3000 }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
