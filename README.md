# exec-loader

Webpack loader to execute imports at build time.

Simply runs the source through [`this.exec`](https://webpack.github.io/docs/loaders.html#exec) and exports the result.

## Installation

`npm install --save-dev exec-loader`

## Usage

**latestRevision.js:**

```js
var child_process = require('child_process');

module.exports = child_process.execSync('git describe', { encoding: 'utf8' }).trim();
```

**example.js:**

```js
import revision from 'exec-loader!./latestRevision';
// revision === 'v1.0.0'

// to cache the result in watch mode
import revision from 'exec-loader?cache!./latestRevision';

// to generate `module.exports` instead of ES6 exports (useful in rare circumstances)
var revision = require('exec-loader?export=commonjs!./latestRevision');
```
