import Negotiator from 'negotiator';

function htmlWasRequested(request) {
  if (request.path.includes('.')) {
    const [, extension] = request.path.split('.');

    return 'html' === extension;
  }

  const negotiator = new Negotiator(request);

  return 'text/html' === negotiator.mediaType();
}

function findMatchedRoutes(excludedRoutes, path) {
  return excludedRoutes.map(route => path.match(route)).filter(Boolean);
}

function pathShouldNotBeExcluded(excludedRoutes, path) {
  if (excludedRoutes) {
    return 0 === findMatchedRoutes(excludedRoutes, path).length;
  }

  return true;
}

function isGetRequestForHtml(request, excludedRoutes) {
  const {method, path} = request;

  return 'get' === method && htmlWasRequested(request) && pathShouldNotBeExcluded(excludedRoutes, path);
}

export const plugin = {
  pkg: require('../package.json'),
  async register(server, options) {
    server.ext('onRequest', (request, h) => {
      if (isGetRequestForHtml(request, options.excludedRoutes)) {
        request.setUrl('/html');
      }

      return h.continue;
    });
  }
};
