# express-async

[![Build Status][travis-badge]][travis]
[![Dependencies][prod-dependencies-badge]][prod-dependencies]
[![MIT License][license-badge]][LICENSE]
[![PRs Welcome][prs-badge]][prs]

## Description

Async wrapper for express functions.

## How to use it?

### Importation

From commonJS

```js
const {wrapAsync} = require('@rimiti/express-async');
```

or from ES6:

```js
import {wrapAsync} from '@rimiti/express-async';
```

### Example

```js
import express from 'express';
import {wrapAsync} from '@rimiti/express-async';

const app = express();
app.get('/example-1', wrapAsync(async function example1(req, res, next) {
  res.status(200).send({example: 1});
}));

app.get('/example-2', wrapAsync(async function example2(req, res) {
  res.status(200).send({example: 2});
}));
```

## Install

```bash
$ npm i @rimiti/express-async -S
```

## Scripts

Run using yarn run `<script>` command.

    clean       - Remove temporarily folders.
    build       - Compile source files.
    build:watch - Interactive watch mode, compile sources on change.
    lint        - Lint source files.
    lint:fix    - Lint source files and auto-fix.

## Credits

This package has been inspired by [express-async-handler](https://github.com/Abazhenov/express-async-handler) but 
it has been totally rewrited in TypeScript.

## License

MIT © [Dimitri DO BAIRRO](https://github.com/rimiti/express-async/blob/master/LICENSE)

[prod-dependencies-badge]: https://david-dm.org/rimiti/express-async/status.svg
[prod-dependencies]: https://david-dm.org/rimiti/express-async
[travis-badge]: https://travis-ci.org/rimiti/express-async.svg?branch=master
[travis]:https://travis-ci.org/rimiti/express-async
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[license]: https://github.com/rimiti/express-async/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
