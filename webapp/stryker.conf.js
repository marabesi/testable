/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  testRunner: 'jest',
  reporters: ['progress', 'html'],
  htmlReporter: {
    baseDir: 'public/stryker'
  },
  timeoutMS: 1500,
  coverageAnalysis: 'off',
  jest: {
    projectType: 'create-react-app',
  },
  mutate: ['src/**/*.ts?(x)', '!src/**/*@(.test|.spec|Spec).ts?(x)', '!src/__test__/**'],
  mutator: 'typescript',
  tempDirName: '.stryker-tmp',
  files: [
    '**',
  ],
};
