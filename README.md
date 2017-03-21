uni-config
================

Shared config for universal JavaScript apps.

Loads configs in a certain order, next config always overriding previous one. Performs a deep merge of nested properties.

To use create a `config` folder next to your `node_modules` folder with one of the following files (loaded in this order):

  1. `default.js`
  2. `mycustomenv.js` where `mycustomenv` is what you would set NODE_ENV to
  3. `local.js`

In addition each config can specify `sandboxOverrides` property that will override config values in "sandbox mode".

## Defaults:

By default config object is supplied with the following properties:
  - `environment` is the value of `NODE_ENV` environment variable or `'development'`
  - `debug` is `true` if `environment` is `development` and there is no `build` key in command line (useful for gulp build scripts)
  - `sandbox` is `true` if `SANDBOX` environment variable is set to `true` or `debug` is `true`

## Options:

All options can be set in the process environment:
 - `NODE_ENV` sets node environment, default: `development`
 - `SANDBOX` sets sandbox mode, default: (empty), accepts: `true`
 - `CONFIG_OVERRIDE_KEY` sets the name of the sandbox overrides property, default: `sandboxOverrides`
 - `CONFIG_DIR` sets the name/path to config folder, relative to the project root, default: `config`

## Usage:

```javascript
  const config = require('config');
  // use your config
```

For clientside to work (with browserify), in package.json add:
```json
  "browser": {
    "uni-config": "uni-config/client.js"
  }
```

And somewhere in your template (pug template as an example):
```jade
  script.
    var __appConfig__=!{JSON.stringify(config)};
```
