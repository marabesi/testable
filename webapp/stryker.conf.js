/**
 * @type {import('@stryker-mutator/api/core').StrykerOptions}
 */
module.exports = {
  testRunner: 'jest',
  reporters: ['progress', 'html'],
  htmlReporter: {
    baseDir: 'public/stryker'
  },
  timeoutMS: 1000,
  coverageAnalysis: 'off',
  jest: {
    projectType: 'create-react-app',
  },
  mutate: [
    'src/components/**/*.ts?(x)',
    '!src/**/*@(.test|.spec|Spec).ts?(x)',
    '!**/*(.json|.css|.scss|.md|.html)',
    '!src/__test__/**'
  ],
  mutator: 'typescript',
  tempDirName: '.stryker-tmp',
  files: [
    '**',
  ],
};
