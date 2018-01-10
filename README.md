# hapi-html-request-router

hapi plugin to direct html requests to a single route

[![npm](https://img.shields.io/npm/v/@travi/hapi-html-request-router.svg?maxAge=2592000)](https://www.npmjs.com/package/@travi/hapi-html-request-router)
[![license](https://img.shields.io/github/license/travi/hapi-html-request-router.svg)](LICENSE)
[![Build Status](https://img.shields.io/travis/travi/hapi-html-request-router.svg?style=flat)](https://travis-ci.org/travi/hapi-html-request-router)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/travi/hapi-html-request-router.svg)](https://greenkeeper.io/)

## Installation

```sh
$ npm install @travi/hapi-html-request-router
```

## Usage

Include this plugin in the [manifest](https://github.com/hapijs/glue) of your
hapi application to direct all requests for `text/html` to a
([not included](https://github.com/travi/hapi-react-router)) `/html` route.

```js
export default {
    connections: [{port: 8090}],
    registrations: [
        {plugin: '@travi/hapi-html-request-router'}
    ]
}
```

### Options

#### `excludedRoutes`

Sometimes you don't want all routes to be re-routed to the `/html` route.
Provide a list of routes as strings or regex patterns to exclude them from
being re-routed.

```js
export default {
    connections: [{port: 8090}],
    registrations: [
        {
          plugin: {
            register: '@travi/hapi-html-request-router',
            options: [
              '/login',
              '/logout',
              '/foo/*',
              /\/bar\/.*/
            ]
          }
        }
    ]
}
```

## Local Development

### Install dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```
