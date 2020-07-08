uni-config
================

Shared config for universal JavaScript apps.

Loads configs in a certain order, next config always overriding previous one. Performs a deep merge of nested properties.

To use this module create a `config` folder next to your `node_modules` folder with one of the following files (loaded in this order):

  1. `default.js`
  2. `mycustomenv.js` where `mycustomenv` is what you would set NODE_ENV to
  3. `local.js`

## Defaults:

By default config object is supplied with the following properties:
  - `environment` is the value of `NODE_ENV` environment variable or `'development'`
  - `debug` is `true` if `environment` is `development`
  - `sandbox` is `true` if `SANDBOX` environment variable is set to `true` or `debug` is `true`

## Options:

All options can be set in the process environment:
 - `NODE_ENV` sets node environment, default: `development`
 - `SANDBOX` sets sandbox mode, default: (empty), accepts: `true`
 - `CONFIG_DIR` sets the name/path to config folder, relative to the project root, default: `config`

## Usage:

```javascript
const config = require('uni-config');
// use your config
```

There is a special UniConfigPlugin for Webpack to bundle config in your client app:

```javascript
const UniConfigPlugin = require('uni-config/plugin');
// ...
plugins: [
  new UniConfigPlugin(options),
],
```

UniConfigPlugin accepts an options object:
```javascript
const options = {
  // An optional function to filter full config hiding secrets from the client app.
  // By default entire config object will be accessible to the client.
  // It's highly recommended to set this function to filter your full config and only output
  // client relevant portions preserving original object structure.
  getConfig: (fullConfig) => {
    const { clientSafePortion } = fullConfig;
    const configWithoutSecrets = { clientSafePortion };
    return configWithoutSecrets;
  },
};
```
