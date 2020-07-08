const path = require('path');

const { getOptions } = require('loader-utils');
const validate = require('schema-utils');

const defaults = require('lodash.defaults');
const serialize = require('serialize-javascript');

const { files } = require('../utils');

const modulePath = path.resolve(`${__dirname}/../index.js`);

const defaultOptions = { getConfig: (config) => config };

const schema = {
  type: 'object',
  properties: {
    getConfig: {
      instanceof: 'Function',
    },
  },
  required: ['getConfig'],
  additionalProperties: false,
};

const getFreshConfig = () => {
  delete require.cache[modulePath];
  files.forEach((key) => { delete require.cache[key]; });
  return require(modulePath);
};

const pitch = function() {
  const options = defaults({}, getOptions(this), defaultOptions);
  validate(schema, options, { name: 'UniConfigPlugin loader' });
  const { getConfig } = options;

  const clientConfig = getConfig(getFreshConfig());
  const content = serialize(clientConfig, { isJSON: true });

  this.cacheable(true);
  files.map((filePath) => this.addDependency(filePath));

  return `module.exports = ${content}`;
};

module.exports = { pitch };
