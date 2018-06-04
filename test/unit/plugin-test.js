import {assert} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import any from '@travi/any';

suite('plugin', () => {
  let sandbox, mediaType, request;
  const server = {};
  const reply = {};
  const continueSymbol = any.word();

  const Negotiator = sinon.stub();
  const router = proxyquire('../../src/plugin', {
    negotiator: Negotiator
  });

  setup(() => {
    sandbox = sinon.createSandbox();

    server.ext = sinon.stub();
    reply.continue = continueSymbol;

    mediaType = sinon.stub();
    request = {...any.simpleObject(), setUrl: sinon.spy(), method: 'get', path: any.word()};
    Negotiator.withArgs(request).returns({mediaType});
  });

  teardown(() => {
    sandbox.restore();
    Negotiator.resetHistory();
  });

  test('that the plugin is defined', () => {
    assert.deepEqual(router.plugin.pkg, require('../../package.json'));
  });

  test('that a non-html request is forwarded with no modification', async () => {
    mediaType.returns('text/foo');

    await router.plugin.register(server, {});
    const [responseSymbol] = server.ext.withArgs('onRequest').yield(request, reply);

    assert.equal(responseSymbol, continueSymbol);
    assert.notCalled(request.setUrl);
  });

  test('that an html request updates the route to match the html route', async () => {
    mediaType.returns('text/html');

    await router.plugin.register(server, {});
    const [responseSymbol] = server.ext.withArgs('onRequest').yield(request, reply);

    assert.equal(responseSymbol, continueSymbol);
    assert.calledWith(request.setUrl, '/html');
  });

  test('that a file extension at the end of the uri takes precedence over the accept header', async () => {
    mediaType.returns('text/html');
    request.path = `/${any.word()}.${any.word()}`;

    await router.plugin.register(server, {});
    server.ext.yield(request, reply);

    assert.notCalled(request.setUrl);
  });

  test('that a file extension of `.html` resolves to html', async () => {
    mediaType.returns('text/html');
    request.path = `/${any.word()}.html`;

    await router.plugin.register(server, {});
    server.ext.yield(request, reply);

    assert.calledWith(request.setUrl, '/html');
  });

  test('that an excluded route is not transformed', async () => {
    const excludedRoute = `/${any.word()}`;
    request.path = excludedRoute;
    mediaType.returns('text/html');

    await router.plugin.register(server, {excludedRoutes: [excludedRoute]});
    server.ext.yield(request, reply);

    assert.notCalled(request.setUrl);
  });

  test('that routes can be excluded by a regex string', async () => {
    const excludedRoute = '/foo/*';
    request.path = '/foo/bar/baz';
    mediaType.returns('text/html');

    await router.plugin.register(server, {excludedRoutes: [excludedRoute]});
    server.ext.yield(request, reply);

    assert.notCalled(request.setUrl);
  });

  test('that routes can be excluded by a regex pattern', async () => {
    const excludedRoute = /\/foo\/.*/;
    request.path = '/foo/bar/baz';
    mediaType.returns('text/html');

    await router.plugin.register(server, {excludedRoutes: [excludedRoute]});
    server.ext.yield(request, reply);

    assert.notCalled(request.setUrl);
  });

  test('that verbs other than GET are not transformed', async () => {
    request.method = any.word();
    mediaType.returns('text/html');

    await router.plugin.register(server, {});
    server.ext.yield(request, reply);

    assert.notCalled(request.setUrl);
  });
});
