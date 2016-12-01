import Negotiator from 'negotiator';

function htmlWasRequested(request) {
    const negotiator = new Negotiator(request);

    return 'text/html' === negotiator.mediaType();
}

function pathShouldNotBeExcluded(options, request) {
    if (options.excludedRoutes) {
        return !options.excludedRoutes.includes(request.path);
    }

    return true;
}

export function register(server, options, next) {
    server.ext('onRequest', (request, reply) => {
        if (htmlWasRequested(request) && pathShouldNotBeExcluded(options, request)) {
            request.setUrl('/html');
        }

        reply.continue();
    });

    next();
}

register.attributes = {
    name: 'html-request-router'
};
