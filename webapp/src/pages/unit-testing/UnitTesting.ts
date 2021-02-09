//@ts-nocheck
import guideContent from './guide-content';
import Rocket from '../../components/ui/interface/rocket/Rocket';
import { testCaseBehavior, testCase } from '../../packages/engine/strategies/behavior/TestCaseBehavior';
import { Sum } from '../../packages/engine/strategies/behavior/Sum';
import { testCase as sumTestCase } from '../../packages/engine/strategies/tester/Sum';
import {TEST_CODE} from '../../components/ui/interface/editor-manager/constants';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
}`;

export default Rocket(
  code,
  test,
  testCase,
  sumTestCase,
  guideContent,
  '/unit-testing-end',
  1,
  1,
  'unit-testing',
  testCaseBehavior,
  Sum,
  0,
  null,
  null,
  null,
  [TEST_CODE]
);
