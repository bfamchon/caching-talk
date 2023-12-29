const httpResponseOptions = {
  cacheControl: false,
  etag: false,
  lastModified: true,
};

const httpResponseOptionsWithCacheControl = {
  cacheControl: true,
  etag: false,
  lastModified: true,
};

/**
 * Encapsulates the routes
 * @param {import("fastify").FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */
async function routes(fastify, options) {
  fastify.get('/', function (request, reply) {
    const d = new Date();
    d.setHours(d.getHours() - 10);
    reply.header('Last-Modified', d.toUTCString());
    reply.sendFile('last-modified.html', httpResponseOptions);
  });
  fastify.get('/css', function (request, reply) {
    const d = new Date();
    d.setHours(d.getHours() - 10);
    reply.header('Last-Modified', d.toUTCString());
    reply.sendFile('/css/last-modified.css', httpResponseOptions);
  });
  fastify.get('/no-cache', function (request, reply) {
    reply.sendFile('last-modified-no-cache.html', httpResponseOptionsWithCacheControl);
  });
  fastify.get('/no-cache/css', function (request, reply) {
    reply.sendFile('/css/last-modified-no-cache.css', httpResponseOptionsWithCacheControl);
  });
}

module.exports = routes;
