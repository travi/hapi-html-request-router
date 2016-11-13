import Negotiator from 'negotiator';

export function register(server, options, next) {
    server.ext('onRequest', (request, reply) => {
        const negotiator = new Negotiator(request);

        if ('text/html' === negotiator.mediaType()) {
            request.setUrl('/html');
        }

        reply.continue();
    });

    next();
}

register.attributes = {
    name: 'html-request-router'
};
