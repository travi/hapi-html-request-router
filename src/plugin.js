import Negotiator from 'negotiator';

function htmlWasRequested(request) {
  if (request.path.includes('.')) {
    const [, extension] = request.path.split('.');

    return 'html' === extension;
  }

  const negotiator = new Negotiator(request);

  return 'text/html' === negotiator.mediaType();
}

function pathShouldNotBeExcluded(excludedRoutes, path) {
  if (excludedRoutes) {
    return !excludedRoutes.includes(path);
  }

  return true;
}

function isGetRequestForHtml(request, excludedRoutes) {
  const {method, path} = request;

  return 'get' === method && htmlWasRequested(request) && pathShouldNotBeExcluded(excludedRoutes, path);
}

export function register(server, options, next) {
  server.ext('onRequest', (request, reply) => {
    if (isGetRequestForHtml(request, options.excludedRoutes)) {
      request.setUrl('/html');
    }

    reply.continue();
  });

  next();
}

register.attributes = {
  pkg: require('../package.json')
};
