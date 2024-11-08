const jsonMerger = require('json-merger');
const { mkdirSync, writeFileSync } = require('fs');

const API_INFO = {
  info: {
    contact: {},
    description:
      'Provides endpoints to handle user authentication, including login and logout',
    title: 'Auth REST API',
    version: '1.0',
  },
};

const mergedFiles = jsonMerger.mergeFiles([
  '/openapi/login/openapi-docs.json',
  '/openapi/logout/openapi-docs.json',
]);

const result = jsonMerger.mergeObjects([mergedFiles, API_INFO]);

writeFileSync('/openapi/openapi-docs.json', JSON.stringify(result), {
  encoding: 'utf8',
});
