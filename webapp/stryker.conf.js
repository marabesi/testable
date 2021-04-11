/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  _comment:
    'This config was generated using \'stryker init\'. Please see the guide for more information: https://stryker-mutator.io/docs/stryker/guides/react',
  testRunner: 'jest',
  reporters: ['progress', 'clear-text', 'html'],
  coverageAnalysis: 'off',
  jest: {
    projectType: 'create-react-app',
  },
  mutate: ['src/**/*.ts?(x)', '!src/**/*@(.test|.spec|Spec).ts?(x)', '!src/__test__/**/*@(.test|.spec|Spec).ts?(x)'],
  mutator: 'typescript',
};
