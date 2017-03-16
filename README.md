easyconfig
================

Shared config for universal JavaScript apps.

Loads configs in a certain order, next config always overriding previous one. Performs a deep merge of nested properties.

To use create a `config` folder next to your `node_modules` folder with one of the following files (loaded in this order):

  1. `default.js`
  2. `mycustomenv.js`
  3. `local.js`

In addition each config can specify `sandboxOverrides` property that will override config values in "sandbox mode".

## Defaults:

By default config object is supplied with following properties:
  - `environment` is the value of NODE_ENV environment variable or 'development'
  - `debug` is `true` if `environment` is `development` and there is no `build` key in command line (useful for gulp build scripts)
  - `sandbox` is `true` if SANDBOX environment variable is set to `true` or `debug` is `true`

## Options:

All options can be set in process environment:
 - `NODE_ENV` sets node environment
 - `SANDBOX` sets sandbox mode
 - `CONFIG_OVERRIDE_KEY` sets name of sandbox overrides property, default: `sandboxOverrides`
 - `CONFIG_DIR` sets name/path to config folder, relative to project root, default: `config`

## Usage:

```
  const config = require('config');
  // use your config
```
