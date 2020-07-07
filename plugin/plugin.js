const path = require('path');
const { debug } = require('../utils');

const PLUGIN_NAME = 'UniConfigPlugin';

const MODULE_LOADER = path.resolve(`${__dirname}/loader.js`);
const REGEX_MODULE = /uni-config\/index\.js$/;

class I18nModularPlugin {
  constructor(options) {
    this.options = options;
    debug('initialized plugin with options %O', options);
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation, { normalModuleFactory }) => {
      normalModuleFactory.hooks.afterResolve.tap(PLUGIN_NAME, (module) => {
        if (REGEX_MODULE.test(module.resource)) {
          debug('injected module loader for %s', module.resource);
          // Webpack is unable to accept a loader function directly 🤷‍♂️
          // A path to a JS file exporting a loader function must be provided.
          module.loaders.push({
            loader: MODULE_LOADER,
            options: this.options,
          });
        }
      });
    });
  }
}

module.exports = I18nModularPlugin;
