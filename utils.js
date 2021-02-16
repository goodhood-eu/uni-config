const fs = require('fs');
const path = require('path');
const logger = require('debug')('uni-config');

const environment = process.env.NODE_ENV || 'development';
const debug = environment === 'development';
const sandbox = process.env.SANDBOX === 'true' || debug;
const configDir = process.env.CONFIG_DIR || 'config';

const base = { environment, debug, sandbox };

logger('building config with %O', base);

const getPath = (name) => path.resolve(`${__dirname}/../../${configDir}/${name}`);
const filterExists = (filePath) => fs.existsSync(filePath);

const files = [
  'default.js',
  `${environment}.js`,
  'local.js',
]
  .map(getPath)
  .filter(filterExists);

logger('located config files %O', files);

module.exports = {
  base,
  files,
  debug: logger,
};
