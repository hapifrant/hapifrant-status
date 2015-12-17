'use strict';

const Hoek = require('hoek');
const Joi = require('joi');

module.exports.register = function (server, options, cb) {

    const defaults = {
        path: '/status',
        tags: ['api', 'status', 'monitor'],
        showFull: true
    };

    options = Hoek.applyToDefaults(defaults, options);

    server.route({
        method: 'GET',
        path: options.path,
        config: {
            tags: options.tags,
            notes: 'My route notes',
            description: 'Check if the server is healthy',
            auth: false,
            response: {
                schema: Joi.object({
                    running: Joi.boolean().default(true).description('Indicates if the service is running.').example(true).required(),
                    uptime: Joi.number().description('The uptime of this process.').example(1.2333),
                    memoryUsage: Joi.object().description('Detailed information about the memory usage.').example('{\'rss\':111693824,\'heapTotal\':86533888,\'heapUsed\':53585416}'),
                    versions: Joi.object().description('System library version information.').example('{\'http_parser\':\'2.3\',\'node\':\'0.12.4\',\'v8\':\'3.28.71.19\',\'uv\':\'1.5.0\',\'zlib\':\'1.2.8\',\'modules\':\'14\',\'openssl\':\'1.0.1m\'}'),
                    droneId: Joi.number().description('The id of the drone running this instance.').example(23453)
                }).description('The status result object.').required().options({
                    allowUnknown: true,
                    stripUnknown: false
                })
            }
        },
        handler: function (request, reply) {

            const status = {
                running: true
            };

            if (options.showFull) {
                status = Hoek.applyToDefaults(status, {
                    uptime: process.uptime(),
                    memoryUsage: process.memoryUsage(),
                    versions: process.versions,
                    droneId: process.pid
                });
            }

            return reply(status);
        }
    });

    return cb();
};

module.exports.register.attributes = {
    pkg: require('../package.json')
};
