# hapi-html-request-router

hapi plugin to direct html requests to a single route

[![Build Status](https://img.shields.io/travis/travi/hapi-html-request-router.svg?style=flat)](https://travis-ci.org/travi/hapi-html-request-router)

[![npm](https://img.shields.io/npm/v/@travi/hapi-html-request-router.svg?maxAge=2592000)](https://www.npmjs.com/package/@travi/hapi-html-request-router)
[![license](https://img.shields.io/github/license/travi/hapi-html-request-router.svg)](LICENSE)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

## Installation

```
$ npm install @travi/hapi-html-request-router
```

## Usage

Include this plugin in the [manifest](https://github.com/hapijs/glue) of your hapi application
to direct all requests for `text/html` to a ([not included](https://github.com/travi/hapi-react-router))
`/html` route.

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
Sometimes you don't want all routes to be re-routed to the `/html` route. Provide a list of routes as strings to exclude
them from being re-routed.

## Local Development

### Install dependencies
```
$ nvm install
$ npm install
```

### Verification
```
$ npm test
```
