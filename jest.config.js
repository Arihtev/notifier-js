module.exports = {
  testEnvironment: 'node',
  silent: true,
  testPathIgnorePatterns: ['/node_modules/'],
  coverageReporters: ['lcov', 'html'],
  rootDir: './',
  moduleFileExtensions: ['js', 'json', 'node'],
  globals: {
    __DEV__: true,
  },
  testRegex: '/src/.*\\.spec.(js)$',
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    'demo',
    '/db/config',
  ],
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['<rootDir>/jest.setup.js']
};
