import {assert} from 'chai';
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import any from '@travi/any';

suite('plugin', () => {
  let sandbox, mediaType, request;

  const Negotiator = sinon.stub();
  const router = proxyquire('../../src/plugin', {
    negotiator: Negotiator
  });

  setup(() => {
    sandbox = sinon.sandbox.create();

    mediaType = sinon.stub();
    request = {...any.simpleObject(), setUrl: sinon.spy(), method: 'get'};
    Negotiator.withArgs(request).returns({mediaType});
  });

  teardown(() => {
    sandbox.restore();
    Negotiator.reset();
  });

  test('that the plugin is defined', () => {
    assert.deepEqual(router.register.attributes, {
      pkg: require('../../package.json')
    });
  });

  test('that a non-html request is forwarded with no modification', () => {
    const server = {ext: sinon.stub()};
    const reply = {continue: sinon.spy()};
    const next = sinon.spy();
    server.ext.withArgs('onRequest').yields(request, reply);
    mediaType.returns('text/foo');

    router.register(server, {}, next);

    assert.calledOnce(next);
    assert.calledOnce(reply.continue);
    assert.notCalled(request.setUrl);
  });

  test('that an html request updates the route to match the html route', () => {
    const server = {ext: sinon.stub()};
    const reply = {continue: sinon.spy()};
    const next = sinon.spy();
    server.ext.withArgs('onRequest').yields(request, reply);
    mediaType.returns('text/html');

    router.register(server, {}, next);

    assert.calledOnce(next);
    assert.calledOnce(reply.continue);
    assert.calledWith(request.setUrl, '/html');
  });

  test('that an excluded route is not transformed', () => {
    const server = {ext: sinon.stub()};
    const reply = {continue: sinon.spy()};
    const next = sinon.spy();
    const excludedRoute = `/${any.word()}`;
    request.path = excludedRoute;
    server.ext.yields(request, reply);
    mediaType.returns('text/html');

    router.register(server, {excludedRoutes: [excludedRoute]}, next);

    assert.notCalled(request.setUrl);
  });

  test('that verbs other than GET are not transformed', () => {
    const next = sinon.spy();
    const reply = {continue: sinon.spy()};
    const server = {ext: sinon.stub()};
    request.method = any.word();
    mediaType.returns('text/html');
    server.ext.yields(request, reply);

    router.register(server, {}, next);

    assert.notCalled(request.setUrl);
  });
});
