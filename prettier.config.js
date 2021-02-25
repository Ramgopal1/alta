/* eslint-disable import/no-extraneous-dependencies */
const prettierConfig = require('@open-wc/prettier-config');
const merge = require('lodash/merge');

/** Overwriting the open-wc settings so they match our code styling */
const modifiedConfig = merge({}, prettierConfig, {});

module.exports = modifiedConfig;
