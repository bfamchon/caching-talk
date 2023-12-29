const httpResponseOptions = {
  cacheControl: true,
  etag: false,
  maxAge: 15000,
  lastModified: false,
};

/**
 * Encapsulates the routes
 * @param {import("fastify").FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.get('/', function (request, reply) {
    // request.log.info(`${request.method} ${request.url} ${reply.statusCode}`);
    reply.sendFile('max-age.html', httpResponseOptions);
  });
  fastify.get('/css', function (request, reply) {
    // request.log.info(`${request.method} ${request.url} ${reply.statusCode}`);
    reply.sendFile('/css/max-age.css', httpResponseOptions);
  });
}

module.exports = routes;
