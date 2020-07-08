const merge = require('lodash.merge');
const { base, files } = require('./utils');

const overrides = files.map((filePath) => require(filePath));
module.exports = merge({}, base, ...overrides);
