const fs = require('fs');
const { resolve } = require('path');
const merge = require('lodash.merge');

const environment = process.env.NODE_ENV || 'development';
const debug = environment === 'development' && !process.argv.includes('build');
const sandbox = process.env.SANDBOX === 'true' || debug;
const overrideProp = process.env.CONFIG_OVERRIDE_KEY || 'sandboxOverrides';
const configDir = process.env.CONFIG_DIR || 'config';

const getConfigs = (paths) => paths.map((path) => {
  if (fs.existsSync(path)) return require(path);
  return null;
});

const getPath = (name) => resolve(`${__dirname}/../../${configDir}/${name}`);

const overrides = getConfigs([
  getPath('default.js'),
  getPath(`${environment}.js`),
  getPath('local.js'),
]);

const base = { environment, debug, sandbox };

let config = merge(base, ...overrides);
if (sandbox) config = merge(config, config[overrideProp]);
delete config[overrideProp];

module.exports = config;
