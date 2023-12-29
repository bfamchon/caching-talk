const httpResponseOptions = {
  cacheControl: true,
  etag: true,
  lastModified: false,
};

/**
 * Encapsulates the routes
 * @param {import("fastify").FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.get('/', function (request, reply) {
    request.log.info(`if-none-match: ${request.headers['if-none-match']}`);
    reply.sendFile('etag.html', httpResponseOptions);
  });
  fastify.get('/css', function (request, reply) {
    request.log.info(`if-none-match: ${request.headers['if-none-match']}`);
    reply.sendFile('/css/etag.css', httpResponseOptions);
  });
}

module.exports = routes;
