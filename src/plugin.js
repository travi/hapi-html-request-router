export function register(server, options, next) {
    server.ext('onRequest');

    next();
}

register.attributes = {
    name: 'html-request-router'
};
