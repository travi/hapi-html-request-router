import {assert} from 'chai';
import sinon from 'sinon';
import {register} from '../../src/plugin';

suite('plugin', () => {
    suite('plugin', () => {
        test('that the plugin is defined', () => {
            assert.deepEqual(register.attributes, {
                name: 'html-request-router'
            });
        });

        test('that the request for html is handled', () => {
            const
                next = sinon.spy(),
                server = {ext: sinon.spy()};

            register(server, null, next);

            assert.calledOnce(next);
            assert.calledWith(server.ext, 'onRequest');
        });
    });
});
