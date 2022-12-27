/*
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  transform: {
    '\\.[jt]sx?$': 'babel-jest',
  },
  globalSetup: '<rootDir>/tests/globalSetup.js',
  globalTeardown: '<rootDir>/tests/globalTeardown.js',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  testRunner: 'jest-circus/runner',
  testTimeout: 10000,
}
