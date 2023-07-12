const config = require('./jest.config.js');
config.testMatch = ['<rootDir>/test/unit/**.test.ts'];
module.exports = config;
