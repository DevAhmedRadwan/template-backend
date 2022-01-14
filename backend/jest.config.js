// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */

const config = {
  testEnvironment: "node",
  setupFiles: [],
  coveragePathIgnorePatterns: ["/node_modules/"],
  verbose: true,
  clearMocks: true,
};

module.exports = config;
