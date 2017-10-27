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
  const pathWithoutTrailingSlash = path.slice(-1) === '/' ? path.slice(0, -1) : path;
  if (excludedRoutes) {
    return !excludedRoutes.includes(pathWithoutTrailingSlash);
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
